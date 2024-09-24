import { CheckoutDto } from '@/core/models';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import Stripe from 'stripe';
import { Order, Product } from '@/core/entities';
import { ORDER_ITEM_SERVICE, OrderItemService } from '@/core/services';
import { ConfigService } from '@nestjs/config';
import { customHttpResponse } from '@/core/response';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @Inject('STRIPE_API_KEY') private readonly apiKey: string,
    private dataSource: DataSource,
    @Inject(ORDER_ITEM_SERVICE) private orderItemService: OrderItemService,
    private configService: ConfigService
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: "2024-06-20", // Use whatever API latest version
    });
  }

  async webhook({ sig, body }) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(body, sig, this.configService.get("STRIPE_WEBHOOK_SECRET"));
    } catch (err) {
      console.log(err)
      throw customHttpResponse.BadRequestException({ message: 'Webhook Error' })
    }

    const session = event.data.object as Stripe.Checkout.Session
    const address = session?.customer_details?.address

    const addressComponents = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.state,
      address?.postal_code,
      address?.country,
    ]

    console.log(addressComponents, 'this is address components')

    const addressString = addressComponents.filter((c) => c !== null).join(', ')

    if (event.type === "checkout.session.completed") {
      const order = await this.dataSource.getRepository(Order).findOne({
        where: {
          id: session?.metadata?.orderId
        }, relations: ['orderItems']
      })

      if (!order) {
        throw customHttpResponse.NotFoundException({ message: 'Order not found!' })
      }

      order.isPaid = true
      order.address = addressString
      order.phone = session?.customer_details?.phone || ''

      await this.dataSource.getRepository(Order).save(order)

      const productIds = order.orderItems.map((orderItem) => orderItem.productId)

      await this.dataSource.getRepository(Product).update(productIds, { isArchived: true });
    }
  }


  async checkout(payload: CheckoutDto) {
    console.log(payload)

    console.log(this.apiKey, 'stripe key')

    const { cart, ...rest } = payload

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    const productIds = cart.map(each => each.productId)

    const products = await this.dataSource.getRepository(Product).find({ where: { id: In(productIds) } })
    const getProductQuantity = (id: string) => {
      const item = cart.filter(each => each.productId === id)
      if (item) return item[0].quantity
    }

    products.forEach((product) => {
      line_items.push({
        quantity: getProductQuantity(product.id) ?? 1,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.name,
          },
          unit_amount: Math.floor(product.price * 100)
        }
      });
    });

    const order = await this.dataSource.transaction(async (em) => {
      const order = em.create(Order, { ...rest })
      const orderData = await em.save(order)

      const preparedOrderItems = cart.map(product => ({ ...product, orderId: orderData.id }))

      await this.orderItemService.createMany({ data: preparedOrderItems }, em)

      return order
    })

    const session = await this.stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${this.configService.get<string>('FRONTEND_STORE_URL')}/cart?success=1`,
      cancel_url: `${this.configService.get<string>('FRONTEND_STORE_URL')}/cart?canceled=1`,
      metadata: {
        orderId: order.id
      },
    });

    return {
      url: session.url
    }
  }
}

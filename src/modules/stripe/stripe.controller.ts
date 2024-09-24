import { Body, Controller, Headers, Post, RawBody, RawBodyRequest, Req, Request } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CheckoutDto } from '@/core/models';
import { Public } from '@/common/decorators/is-public.decorator';

@Controller('payment')
export class StripeController {
  constructor(private stripeService: StripeService) { }

  // @Post('checkout')
  // async getCustomers() {
  //   return await this.stripeService.getProducts();
  // }

  @Post("checkout")
  async checkoutOrder(@Body() body: CheckoutDto, @Request() req): Promise<{ url: string }> {
    return await this.stripeService.checkout({ ...body, userId: req.user.userId })
  }

  @Public()
  @Post("webhook")
  async webhook(@Headers('stripe-signature') stripeSignature: string, @RawBody() body: any) {
    return await this.stripeService.webhook({ sig: stripeSignature, body })
  }
}

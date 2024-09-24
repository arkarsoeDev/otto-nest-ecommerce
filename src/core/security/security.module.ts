import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import * as cors from 'cors';
import { AuthModule } from '@/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/core/guards/jwt-auth.guard';

@Module({
  imports: [AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ]
})
export class SecurityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: ["http://localhost:3001"],
          "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
          // allowedHeaders: '*',
          credentials: true,
        }),
      )
      .forRoutes('*')
  }
}

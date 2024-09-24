import { Global, Module } from '@nestjs/common';
import { AUTH_SERVICE } from '@/core/services';
import { AuthController } from './auth.controller';
import { LocalAuthService } from './services/local-auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: 60 * 60 * 24 * 31 },
        };
      },
      inject: [ConfigService]
    }),
  ],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: LocalAuthService
    }, LocalStrategy, JwtStrategy
  ],
  exports: [
    {
      provide: AUTH_SERVICE,
      useClass: LocalAuthService
    }
  ]
})
export class AuthModule { }

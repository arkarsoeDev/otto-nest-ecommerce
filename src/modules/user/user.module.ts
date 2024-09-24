import { Module } from '@nestjs/common';
import { TypeormUserService } from './services/typeorm-user.service';
import { USER_SERVICE } from '@/core/services/user.service.interface';
import { User } from '@/core/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: TypeormUserService
    }
  ],
  exports: [
    {
      provide: USER_SERVICE,
      useClass: TypeormUserService
    }
  ],
})
export class UserModule { }

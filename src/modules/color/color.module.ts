import { Module } from '@nestjs/common';
import { ColorController } from './controllers/color.controller';
import { TypeormColorService } from './services/typeorm-color.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from '@/core/entities';
import { COLOR_SERVICE } from '@/core/services';
import { OwnerColorController } from './controllers/owner-color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorController, OwnerColorController],
  providers: [
    {
      provide: COLOR_SERVICE,
      useClass: TypeormColorService
    }
  ]
})
export class ColorModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daycare } from './dayCare.entity';
import { DaycareService } from './daycare.service';
import { DaycareController } from './daycare.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Daycare])],
  providers: [DaycareService],
  controllers: [DaycareController],
})
export class DaycareModule {}

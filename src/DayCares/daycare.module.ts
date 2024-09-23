import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daycare } from './dayCare.entity';
import { DaycareService } from './daycare.service';
import { DaycareController } from './daycare.controller';
import { UserModule } from 'src/Users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Daycare]),UserModule],
  providers: [DaycareService, UserModule],
  controllers: [DaycareController],
})
export class DaycareModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/typeorm.module';
import { DaycareModule } from './DayCares/daycare.module';

@Module({
  imports: [DatabaseModule, DaycareModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

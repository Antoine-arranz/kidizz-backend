import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/typeorm.module';
import { DaycareModule } from './DayCares/daycare.module';
import { UserModule } from './Users/user.module';

@Module({
  imports: [DatabaseModule, DaycareModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/typeorm.module';
import { DaycareModule } from './DayCares/daycare.module';
import { UserModule } from './Users/user.module';
import { IsUniqueConstraint } from './shared/validation/is-unique-contraint';

@Module({
  imports: [DatabaseModule, DaycareModule, UserModule],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/typeorm.module';
import { ChildCareModule } from './ChildCares/childCare';
import { UserModule } from './Users/user.module';
import { IsUniqueConstraint } from './shared/validation/is-unique-contraint';

@Module({
  imports: [DatabaseModule, ChildCareModule, UserModule],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule { }

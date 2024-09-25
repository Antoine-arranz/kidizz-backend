import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/typeorm.module';
import { ChildCareModule } from './ChildCares/childCare.module';
import { UserModule } from './Users/user.module';
import { IsUniqueConstraint } from './shared/validation/is-unique-contraint';
import { EmailQueueModule } from './email/email-queue.module';
import { ChildModule } from './Childs/child.module';

@Module({
  imports: [
    DatabaseModule,
    ChildCareModule,
    UserModule,
    EmailQueueModule,
    ChildModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}

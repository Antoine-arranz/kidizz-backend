import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/typeorm.module';
import { ChildCareModule } from './ChildCares/childCare';
import { UserModule } from './Users/user.module';
import { IsUniqueConstraint } from './shared/validation/is-unique-contraint';
import { BullModule } from '@nestjs/bullmq';
import { ChildModule } from './Childs/child.module';
import { RedisModule } from './database/redis.module';
import { EmailQueueModule } from './email/email-queue.module';

@Module({
  imports: [DatabaseModule, RedisModule,  UserModule, ChildModule, EmailQueueModule],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}

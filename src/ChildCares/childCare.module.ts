import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildCare } from './childCare.entity';
import { ChildCareService } from './childCare.service';
import { ChildCareController } from './childCare.controller';
import { UserModule } from 'src/Users/user.module';
import { ChildModule } from 'src/Childs/child.module';
import { BullModule } from '@nestjs/bullmq';
import { EmailQueueModule } from 'src/email/email-queue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChildCare]),
    UserModule,
    EmailQueueModule,
  ],
  providers: [ChildCareService],
  controllers: [ChildCareController],
  exports: [TypeOrmModule],
})
export class ChildCareModule {}

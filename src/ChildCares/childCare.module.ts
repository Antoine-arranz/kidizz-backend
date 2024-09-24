import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildCare } from './childCare.entity';
import { ChildCareService } from './childCare.service';
import { ChildCareController } from './childCare.controller';
import { UserModule } from 'src/Users/user.module';
import { EmailQueueModule } from 'src/email/email-queue.module';
import { ChildModule } from 'src/Childs/child.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChildCare]),
    UserModule,
    EmailQueueModule,
    forwardRef(() => ChildModule)
  ],
  providers: [ChildCareService],
  controllers: [ChildCareController],
  exports: [TypeOrmModule],
})
export class ChildCareModule {}
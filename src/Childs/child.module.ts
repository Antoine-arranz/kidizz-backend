import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Child } from './child.entity';
import { ChildController } from './child.controller';
import { ChildService } from './child.service';
import { UserModule } from 'src/Users/user.module';
import { ChildCareModule } from 'src/ChildCares/childCare.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Child]),
    UserModule,
    forwardRef(() => ChildCareModule),
  ],
  providers: [ChildService],
  controllers: [ChildController],
  exports: [TypeOrmModule],
})
export class ChildModule {}

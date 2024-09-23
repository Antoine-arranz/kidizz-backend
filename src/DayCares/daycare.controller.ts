import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { DaycareService } from './daycare.service';
import { Daycare } from './dayCare.entity';
import { CreateChildCaresDto } from './dto/create-child-cares.dto';

@Controller('child-cares')
export class DaycareController {
  constructor(private readonly daycareService: DaycareService) {}

  @Get()
  async findAll(): Promise<Daycare[]> {
    return this.daycareService.findAll();
  }

  @Post()
  async addChildCares(
    @Body(ValidationPipe) createChildCareDto: CreateChildCaresDto,
    @Headers('X-Auth') username: string,
  ): Promise<void> {
    if (!username) {
      throw new Error('Missing X-Auth header');
    }
    this.daycareService.addChildCares(createChildCareDto, username);
  }

@Delete('/:id')
  async deleteChildCare(
    @Param('id') id: string,
    @Headers('X-Auth') username: string,
  ): Promise<void> {
    if (!username) {
      throw new Error('Missing X-Auth header');
    }
    await this.daycareService.deleteChildCare(id, username);
  }
}

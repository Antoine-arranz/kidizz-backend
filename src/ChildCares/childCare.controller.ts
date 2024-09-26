import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ChildCareService } from './childCare.service';
import { ChildCare } from './childCare.entity';
import { CreateChildCaresDto } from './dto/create-child-cares.dto';

@Controller('child-cares')
export class ChildCareController {
  constructor(private readonly childCareService: ChildCareService) {}

  @Get()
  async findAll(): Promise<ChildCare[]> {
    return this.childCareService.findAll();
  }

  @Get('/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ChildCare | null> {
    return this.childCareService.findOne(id);
  }

  @Post()
  async addChildCare(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createChildCareDto: CreateChildCaresDto,
    @Headers('X-Auth') username: string,
  ): Promise<void> {
    if (!username) {
      throw new Error('Missing X-Auth header');
    }
    this.childCareService.addChildCare(createChildCareDto, username);
  }

  @Delete('/:id')
  async deleteChildCare(
    @Param('id', ParseIntPipe) id: number,
    @Headers('X-Auth') username: string,
  ): Promise<void> {
    if (!username) {
      throw new Error('Missing X-Auth header');
    }
    await this.childCareService.deleteChildCare(id, username);
  }
}

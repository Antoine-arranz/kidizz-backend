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
  async findOne(@Param('id') id: number): Promise<ChildCare | null> {
    return this.childCareService.findOne(id);
  }

  @Post()
  async addChildCares(
    @Body(ValidationPipe) createChildCareDto: CreateChildCaresDto,
    @Headers('X-Auth') username: string,
  ): Promise<void> {
    if (!username) {
      throw new Error('Missing X-Auth header');
    }
    this.childCareService.addChildCares(createChildCareDto, username);
  }

  @Delete('/:id')
  async deleteChildCare(
    @Param('id') id: string,
    @Headers('X-Auth') username: string,
  ): Promise<void> {
    if (!username) {
      throw new Error('Missing X-Auth header');
    }
    await this.childCareService.deleteChildCare(id, username);
  }

  
}

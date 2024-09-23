import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { ChildService } from './child.service';
import { CreateChildDto } from './dto/create-child.dto';
import { Child } from './child.entity';

@Controller('child')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Post()
  async addChild(
    @Body(ValidationPipe) createChildDto: CreateChildDto,
    @Headers('X-Auth') username: string,
  ): Promise<void> {
    if (!username) {
      throw new Error('Missing X-Auth header');
    }
    await this.childService.addChild(createChildDto, username);
  }

  @Get()
  async findAll(): Promise<Child[]> {
    return this.childService.findAll();
  }

  @Delete('/:childCareId/child/:childId')
  async removeChildFromChildCare(
    @Param('childCareId') childCareId: string,
    @Param('childId') childId: string,
    @Headers('X-Auth') username: string,
  ): Promise<void> {
    if (!username) {
      throw new UnauthorizedException('Missing X-Auth header');
    }
    await this.childService.removeChildFromChildCare(
      +childCareId,
      +childId,
      username,
    );
  }

  @Get('search')
  async searchByName(@Query('name') name: string): Promise<Child[]> {
    if (!name) {
      throw new UnauthorizedException('Veuillez indiquer un nom');
    }
    return this.childService.searchByName(name);
  }
}

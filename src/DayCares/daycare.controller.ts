import { Controller, Get } from '@nestjs/common';
import { DaycareService } from './daycare.service';
import { Daycare } from './dayCare.entity';

@Controller('child-cares')
export class DaycareController {
  constructor(private readonly daycareService: DaycareService) {}

  @Get()
  async findAll(): Promise<Daycare[]> {
    return this.daycareService.findAll();
  }
}

import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller()
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  getHello(): string {
    return this.catService.getHello();
  }
}

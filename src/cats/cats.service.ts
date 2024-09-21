import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly salutation: string = 'Hello catszzzzz';
  getHello(): string {
    return this.salutation;
  }
}

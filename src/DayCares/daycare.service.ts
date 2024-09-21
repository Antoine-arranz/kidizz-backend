import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Daycare } from './dayCare.entity';

@Injectable()
export class DaycareService {
  constructor(
    @InjectRepository(Daycare)
    private readonly daycareRepository: Repository<Daycare>,
  ) {}

  async findAll(): Promise<Daycare[]> {
    return this.daycareRepository.find();
  }
}

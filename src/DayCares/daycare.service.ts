import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Daycare } from './dayCare.entity';
import { CreateChildCaresDto } from './dto/create-child-cares.dto';
import { User } from 'src/Users/user.entity';

@Injectable()
export class DaycareService {
  constructor(
    @InjectRepository(Daycare)
    private readonly daycareRepository: Repository<Daycare>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Daycare[]> {
    return this.daycareRepository.find();
  }

  async addChildCares(
    createChildCareDto: CreateChildCaresDto,
    username: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    const newChildCare = this.daycareRepository.create({
      ...createChildCareDto,
      creator: user,
    });

    this.daycareRepository.save(newChildCare);
  }

  async deleteChildCare(id: string, username: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }

    const daycare = await this.daycareRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['creator'],
    });

    if (!daycare) {
      throw new NotFoundException(`Daycare with ID "${id}" not found`);
    }
    if (daycare.creator.id !== user.id) {
      throw new ForbiddenException(
        `Vous n'etes pas autorisé à supprimer cette crêche`,
      );
    }

    await this.daycareRepository.remove(daycare);
  }
}

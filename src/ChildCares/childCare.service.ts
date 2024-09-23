import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChildCare } from './childCare.entity';
import { CreateChildCaresDto } from './dto/create-child-cares.dto';
import { User } from 'src/Users/user.entity';
import { Child } from 'src/Childs/child.entity';

@Injectable()
export class ChildCareService {
  constructor(
    @InjectRepository(ChildCare)
    private readonly childCareRepository: Repository<ChildCare>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
  ) {}

  async findAll(): Promise<ChildCare[]> {
    return this.childCareRepository.find();
  }

  async addChildCares(
    createChildCareDto: CreateChildCaresDto,
    username: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    const newChildCare = this.childCareRepository.create({
      ...createChildCareDto,
      creator: user,
    });

    this.childCareRepository.save(newChildCare);
  }

  async deleteChildCare(id: string, username: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }

    const childCare = await this.childCareRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['creator'],
    });

    if (!childCare) {
      throw new NotFoundException(`Child care with ID "${id}" not found`);
    }
    if (childCare.creator.id !== user.id) {
      throw new ForbiddenException(
        `Vous n'etes pas autorisé à supprimer cette crêche`,
      );
    }

    await this.childCareRepository.remove(childCare);
  }

  async getChildrenByChildCare(childCareId: number): Promise<Child[]> {
    return this.childRepository.find({
      where: { childCares: { id: childCareId } },
    });
  }
  async findOne(id: number): Promise<ChildCare | null> {
    return this.childCareRepository.findOne({ where: { id } });
  }
}

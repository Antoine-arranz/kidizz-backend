import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Child } from 'src/Childs/child.entity';
import { CreateChildDto } from './dto/create-child.dto';
import { User } from 'src/Users/user.entity';
import { ChildCare } from 'src/ChildCares/childCare.entity';

@Injectable()
export class ChildService {
  constructor(
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ChildCare)
    private readonly childCareRepository: Repository<ChildCare>,
  ) {}

  async addChild(
    createChildDto: CreateChildDto,
    username: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    const childCare = await this.childCareRepository.findOne({
      where: { id: createChildDto.childCareId },
    });

    if (!childCare) {
      throw new NotFoundException(
        `Child care with id ${createChildDto.childCareId} not found`,
      );
    }

    const newChild = this.childRepository.create({
      ...createChildDto,
      creator: user,
      childCares: [childCare],
    });

    await this.childRepository.save(newChild);
  }

  async findAll(): Promise<Child[]> {
    return this.childRepository.find();
  }

  async removeChildFromChildCare(
    childCareId: number,
    childId: number,
    username: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const child = await this.childRepository.findOne({
      where: { id: childId },
      relations: ['creator', 'childCares'],
    });

    if (!child) {
      throw new NotFoundException('Child not found');
    }

    if (child.creator.id !== user.id) {
      throw new UnauthorizedException(
        `Vous n'etes pas autorisé à supprimer cette enfant`,
      );
    }

    const childCare = child.childCares.find((d) => d.id === childCareId);
    if (!childCare) {
      throw new NotFoundException(
        'Child is not associated with this childCare',
      );
    }

    child.childCares = child.childCares.filter((d) => d.id !== childCareId);

    if (child.childCares.length === 0) {
      await this.childRepository.remove(child);
    } else {
      await this.childRepository.save(child);
    }
  }

  async searchByName(name: string): Promise<Child[]> {
    return this.childRepository.find({
      where: [
        { firstName: Like(`%${name}%`) },
        { lastName: Like(`%${name}%`) },
      ],
    });
  }

  async associateChildWithChildCare(
    childId: number,
    childCareId: number,
  ): Promise<void> {
    const child = await this.childRepository.findOne({
      where: { id: childId },
      relations: ['childCares'],
    });
    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    const childCare = await this.childCareRepository.findOne({
      where: { id: childCareId },
      relations: ['creator'],
    });
    if (!childCare) {
      throw new NotFoundException(`ChildCare with ID ${childCareId} not found`);
    }

    if (!child.childCares.some(cc => cc.id === childCare.id)) {
      child.childCares.push(childCare);
      await this.childRepository.save(child);
    }
  }

    async getChildrenByChildCare(childCareId: number): Promise<Child[]> {
    return this.childRepository.find({
      where: { childCares: { id: childCareId } },
    });
  }
}

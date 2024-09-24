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
import { EmailQueueService } from 'src/email/email-queue.service';

@Injectable()
export class ChildCareService {
  constructor(
    @InjectRepository(ChildCare)
    private readonly childCareRepository: Repository<ChildCare>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
    private readonly emailQueueService: EmailQueueService,
  ) {}

  async findAll(): Promise<ChildCare[]> {
    return this.childCareRepository.find();
  }

  async addChildCare(
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
        `Vous n'êtes pas autorisé à supprimer cette crèche`,
      );
    }

    //Récupérer tous les enfants associés à cette crèche
    const children = await this.childRepository.find({
      where: { childCares: { id: parseInt(id) } },
      relations: ['creator'],
    });

    // Collecter les e-mails uniques des créateurs d'enfants
    const creatorEmails = new Set<string>();
    children.forEach((child) => {
      if (child.creator.id !== user.id) {
        creatorEmails.add(child.creator.email);
      }
    });
   
    // Ajouter les e-mails à la file d'attente
    for (const email of creatorEmails) {
      await this.emailQueueService.addToQueue(email);
    }

    // Supprimer la crèche
    await this.childCareRepository.remove(childCare);
  }

  async findOne(id: number): Promise<ChildCare | null> {
    return this.childCareRepository.findOne({ where: { id } });
  }
}

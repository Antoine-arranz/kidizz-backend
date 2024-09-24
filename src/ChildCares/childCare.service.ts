import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChildCare } from './childCare.entity';
import { CreateChildCaresDto } from './dto/create-child-cares.dto';
import { User } from 'src/Users/user.entity';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EmailQueueService } from 'src/email/email-queue.service';

@Injectable()
export class ChildCareService {
  constructor(
    @InjectRepository(ChildCare)
    private childCareRepository: Repository<ChildCare>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailQueueService: EmailQueueService,
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
        `Vous n'êtes pas autorisé à supprimer cette crèche`,
      );
    }

    // Récupérer tous les enfants de la crèche
    const children = await this.getChildrenByChildCare(parseInt(id));

    // Récupérer les e-mails uniques des créateurs d'enfants, en excluant l'initiateur de la suppression
    const creatorEmails = [...new Set(children
      .map(child => child.creator.email)
      .filter(email => email !== user.email))];

   // Ajouter les e-mails à la file d'attente
    await this.emailQueueService.addEmailsToQueue(creatorEmails);

    // Supprimer la crèche
    // await this.childCareRepository.remove(childCare);
  }

  async findOne(id: number): Promise<ChildCare | null> {
    return this.childCareRepository.findOne({ where: { id } });
  }
}

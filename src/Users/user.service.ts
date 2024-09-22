import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    const user = this.userRepository.findOne({ where: { username } });
    if(!user){
      throw new  NotFoundException('User not found')
    }
    return user
  }
    async createOrUpdate(userData: CreateUserDto): Promise<User> {
    let user = await this.userRepository.findOne({ where: { username: userData.username } });
    
    if (user) {
      user.email = userData.email;
    } else {
      user = this.userRepository.create(userData);
    }

    return this.userRepository.save(user);
  }
  
}

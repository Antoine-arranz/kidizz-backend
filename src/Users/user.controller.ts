import { Body, Controller, Get, NotFoundException, Param, Put, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

   @Get()
  async findByUsername(@Query('username') username: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    return user;
  }
  
  @Put()
  async createOrUpdate(@Body(ValidationPipe) userData: CreateUserDto): Promise<User> {
    return this.userService.createOrUpdate(userData);
  }
}

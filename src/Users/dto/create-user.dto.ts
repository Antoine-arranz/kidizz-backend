import { IsEmail, IsNotEmpty, IsString, MinLength, } from 'class-validator';
import { IsUnique } from 'src/shared/validation/is-unique';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsUnique({tableName :'user',column:'email'})
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsUnique({tableName :'user',column:'username'})
  username: string;
}
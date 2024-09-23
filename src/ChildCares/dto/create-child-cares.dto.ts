import { IsNotEmpty } from 'class-validator';

export class CreateChildCaresDto {
  @IsNotEmpty()
  name: string;
}

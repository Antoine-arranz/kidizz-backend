import { IsNotEmpty } from 'class-validator';

export class CreateChildDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  childCareId: number;
}

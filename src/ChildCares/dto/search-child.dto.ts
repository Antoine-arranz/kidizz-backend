import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SearchChildDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;
}
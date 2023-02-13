import { IsNotEmpty, IsString } from 'class-validator';

export class TodoItemDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  createdOn?: Date;
}

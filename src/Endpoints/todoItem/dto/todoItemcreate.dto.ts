import { IsNotEmpty } from 'class-validator';

export class CreateTodoItemDto {
  @IsNotEmpty()
  name: string;
}

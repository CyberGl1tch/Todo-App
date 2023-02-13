import { TodoItemDto } from '../../todoItem/dto/todoItemDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

export class TodoDto {
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  name: string;

  createdOn?: Date;

  @IsOptional()
  description?: string;

  user: UserDto;

  tasks?: TodoItemDto[];
}

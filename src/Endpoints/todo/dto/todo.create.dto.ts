import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

export class CreateTodoDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @MaxLength(1000)
  description?: string;
}

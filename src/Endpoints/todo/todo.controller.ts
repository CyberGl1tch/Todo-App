import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  UseGuards,
  Req, ValidationPipe,
} from '@nestjs/common';
import { TodoListDto } from './dto/todo.list.dto';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/todo.create.dto';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/user.dto';


@UsePipes(new ValidationPipe({transform: true}))
@Controller('/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Req() req: any) {
    let user = req.user as UserDto
    const todos = await this.todoService.getAllTodo(user);
    return todos;
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todoService.getOneTodo(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: any,
  ) {
    const user = req.user as UserDto;
    return await this.todoService.createTodo(user, createTodoDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() todoDto: TodoDto,
  ) {
    return await this.todoService.updateTodo(id, todoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete(@Param('id') id: string) {
     await this.todoService.deleteTodo(id);
  }
}

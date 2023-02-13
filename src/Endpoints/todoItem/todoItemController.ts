import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  UsePipes,
  UseGuards, ValidationPipe,
} from '@nestjs/common';
import { TodoItemService } from './todoItem.service';
import { TodoItemListDto } from './dto/todoItemListDto';
import { TodoItemDto } from './dto/todoItemDto';
import { CreateTodoItemDto } from './dto/todoItemcreate.dto';
import { AuthGuard } from '@nestjs/passport';

@UsePipes(new ValidationPipe({transform: true}))
@Controller('todos')
export class TodoItemController {
  constructor(private todoItemService: TodoItemService) {}

  @Get(':id')
  async findTodoItemById(@Param('id') id: string) {
    return await this.todoItemService.getTodoItem(id);
  }

  @Get(':id/todoItem')
  async findTodoItemsByTodo(@Param('id') id: string) {
    const todoItems = await this.todoItemService.getTodoItemByTodo(id);
    return todoItems;
  }

  @Post(':id/todoItem')
  @UseGuards(AuthGuard())
  async create(
    @Param('id') todoId: string,
    @Body() createTodoItemDto: CreateTodoItemDto,
  ) {
    return await this.todoItemService.createTodoItem(todoId, createTodoItemDto);
  }

  @Delete(':id/todoItem/:itemId')
  @UseGuards(AuthGuard())
  async delete(@Param('itemId') id: string) {
    await this.todoItemService.deleteTodoItem(id);
  }
}

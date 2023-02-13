import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoItemDto } from './dto/todoItemcreate.dto';
import { TodoItemDto } from './dto/todoItemDto';
import { TodoItemEntity } from '../../TypeOrm/Entities/todoItem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../../TypeOrm/Entities/todo.entity';
import { todoItemRepository } from '../../TypeOrm/Repositories/todoItem.repository';
import { todoRepository } from '../../TypeOrm/Repositories/todo.repository';

@Injectable()
export class TodoItemService {
  constructor(

  ) {}

  async getTodoItem(id: string) {
    const todoItem = await todoItemRepository.findOne({ where: { id } });

    if (!todoItem) {
      throw new HttpException(`TodoItem doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return todoItem;
  }

  async getTodoItemByTodo(id: string) {
    const tasks = await todoItemRepository.find({
      where: { todo: { id } },
      relations: {
        todo: true
      },
    });

    return tasks;
  }

  async createTodoItem(todoId: string, todoItemDto: CreateTodoItemDto) {

    const todo = await todoRepository.findOne({
      where: { id: todoId },
      relations: {
        todoItems: true,
        user: true
      },
    });

    const todoItem: TodoItemEntity = await todoItemRepository.create({
      name: todoItemDto.name,
      todo,
    });

    await todoItemRepository.save(todoItem);

    return todoItem;
  }

  async deleteTodoItem(id: string){
    const todoItem = await todoItemRepository.findOne({ where: { id } });

    if (!todoItem) {
      throw new HttpException(`Task doesn't exist`, HttpStatus.NOT_FOUND);
    }

    await todoItemRepository.delete({ id });
  }
}

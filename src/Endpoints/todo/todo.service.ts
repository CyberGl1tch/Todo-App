import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { TodoEntity } from '../../TypeOrm/Entities/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/todo.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { todoRepository } from '../../TypeOrm/Repositories/todo.repository';

@Injectable()
export class TodoService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async getAllTodo(user) {
    const todos = await todoRepository.find({
      where: {
        user: {
          id : user.id
        }
      },

      relations: {
        todoItems: true,
        user:true
  } });
    return todos;
  }

  async getOneTodo(id: string) {
    const todo = await todoRepository.findOne({
      where: { id },
      relations: {
        todoItems: true,
        user: true
      },
    });

    if (!todo) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return todo;
  }

  async createTodo(
    userDto: UserDto,
    createTodoDto: CreateTodoDto,
  ) {
    const { name, description } = createTodoDto;

    const user = await this.usersService.findOne({ where: { id: userDto.id } });

    const todo: TodoEntity = await todoRepository.create({
      name,
      description,
      user: user,
    });

    await todoRepository.save(todo);

    return todo;
  }

  async updateTodo(id: string, todoDto: TodoDto) {

    let todo: TodoEntity = await todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new HttpException(
        `Todo doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    todo = {
      id: id,
      name: todoDto.name,
      description: todoDto.description,
    };

    await todoRepository.update({ id }, todo); // update

    todo = await todoRepository.findOne({
      where: { id },
      relations: {
        todoItems: true,
        user: true
    },
    });

    return todo;
  }

  async deleteTodo(id: string){
    const todo: TodoEntity = await todoRepository.findOne({
      where: { id },
      relations: {
       todoItems: true,
       user: true
      },
    });

    if (!todo) {
      throw new HttpException(
        `Todo doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await todoRepository.delete({ id }); // delete todo list

  }
}

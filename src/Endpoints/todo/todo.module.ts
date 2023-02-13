import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoItemController } from '../todoItem/todoItemController';
import { TodoItemService } from '../todoItem/todoItem.service';
import { TodoEntity } from '../../TypeOrm/Entities/todo.entity';
import { TodoItemEntity } from '../../TypeOrm/Entities/todoItem.entity';
import { UserEntity } from '../../TypeOrm/Entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from 'src/Endpoints/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule,
  ],
  controllers: [TodoController, TodoItemController],
  providers: [TodoService, TodoItemService],
})
export class TodoModule {}

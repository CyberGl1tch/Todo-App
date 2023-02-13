import { AppDataSource } from '../data-source';
import { TodoEntity } from '../Entities/todo.entity';
import { TodoItemEntity } from '../Entities/todoItem.entity';

export const todoItemRepository = AppDataSource.getRepository(TodoItemEntity).extend({
  findById(id: string) {
    return this.findOne({
      where: { id }
    });
  },
  getAll() {
    return this.find();
  },
})
import { TodoEntity } from '../Entities/todo.entity';
import { AppDataSource } from '../data-source';

export const todoRepository = AppDataSource.getRepository(TodoEntity).extend({
  findById(id: string) {
    return this.findOne({
      where: { id }
    });
  },
  getAll() {
    return this.find();
  },
})
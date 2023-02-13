import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity({schema: "todo"})
export class TodoItemEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @CreateDateColumn()
  createdOn?: Date;

  @ManyToOne(type => TodoEntity, todo => todo.todoItems)
  todo?: TodoEntity;
}

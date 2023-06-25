import { TodoItemEntity } from './todoItem.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './user.entity';
@Entity({schema: "todo"})
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn()
  createdOn?: Date;

  @CreateDateColumn()
  updatedOn?: Date;

  @ManyToOne(type => UserEntity)
  user?: UserEntity;

  @OneToMany(type => TodoItemEntity, task => task.todo)
  todoItems?: TodoItemEntity[];
}

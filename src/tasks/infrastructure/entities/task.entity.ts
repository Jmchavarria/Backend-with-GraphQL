import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { TaskStatusTypeEnum } from '../../domain/enums/task-status-type.enum.js';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusTypeEnum,
    default: TaskStatusTypeEnum.TODO,
  })
  status: TaskStatusTypeEnum;

  @Column({ type: 'int', default: 0 })
  position: number;

  @CreateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

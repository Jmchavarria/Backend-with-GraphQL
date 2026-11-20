import { Module } from '@nestjs/common';
import { TaskResolver } from './presentation/resolvers/task.resolver.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './infrastructure/entities/task.entity.js';
import { CreateTaskUseCase } from './application/create-task.use-case.js';
import { GetBoarTasksUseCase } from './application/get-board-tasks.use-case.js';
import { TaskRepository } from './domain/repositories/task.repository.interface.js';
import { TaskRepositoryImpl } from './infrastructure/repositories/task.repository-impl.js';
import { UpdateTaskUseCase } from './application/update-task.use-case.js';
import { DeleteTaskUseCase } from './application/delete-task.use-case.js';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [
    TaskResolver,
    CreateTaskUseCase,
    GetBoarTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    {
      provide: TaskRepository,
      useClass: TaskRepositoryImpl,
    },
  ],
})
export class TasksModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TasksModule } from './tasks/task.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // Utiliza Apollo Server como driver/motor de ejecución para GraphQL.
      driver: ApolloDriver,

      // Genera y actualiza automáticamente el archivo schema.gql a partir de los
      // decoradores de TypeScript (@ObjectType, @InputType, @Query, @Mutation, etc.).
      // process.cwd() asegura que la ruta se resuelva desde la raíz del proyecto.
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

      // Ordena alfabéticamente los tipos y campos en schema.gql para facilitar
      // la lectura y mantener diffs limpios en el control de versiones (Git).
      sortSchema: true,

      // Habilita la interfaz interactiva en el navegador para explorar el esquema
      // y ejecutar queries/mutations de prueba (recomendable desactivar en producción).
      playground: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME ?? 'tasks',
      autoLoadEntities: true,
      synchronize: true,
    }),

    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

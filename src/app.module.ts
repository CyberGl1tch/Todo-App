import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './Endpoints/todo/todo.module';
import { UsersModule } from './Endpoints/users/users.module';
import { AuthModule } from './Endpoints/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandler } from './Utils/ExeptionFilter/ErrorHandler';
import { TypeOrmModule } from './TypeOrm/TypeOrm.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    TodoModule,
    UsersModule,
    TypeOrmModule,
  ],
  providers: [AppService,
/*    {
      provide: APP_FILTER,
      useClass: ErrorHandler,
    }*/
  ]
})

export class AppModule {

}

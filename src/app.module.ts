import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Endpoints/users/users.module';
import { AuthModule } from './Endpoints/auth/auth.module';
import { TypeOrmModule } from './TypeOrm/TypeOrm.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule,
  ],
  providers: [AppService
  ]
})

export class AppModule {

}

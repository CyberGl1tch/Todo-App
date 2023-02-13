import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './TypeOrm/TypeOrm.module';

@Module({
  controllers: [AppController],
  imports: [
        TypeOrmModule,
  ],
  providers: [AppService,
  ]
})

export class AppModule {

}

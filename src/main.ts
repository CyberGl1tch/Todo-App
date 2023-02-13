import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      bodyParser: true,
    });

  app.enableCors();




  await app.listen(port);

}

bootstrap();

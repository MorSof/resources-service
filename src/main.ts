import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as swaggerUi from 'swagger-ui-express';
import * as yaml from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = yaml.load('./src/api/openapi/spec.yaml');
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  await app.listen(3002);
}
bootstrap().then();

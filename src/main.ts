import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  (app as any).useStaticAssets(join(__dirname, '..', 'static'));
  (app as any).setBaseViewsDir(join(__dirname, '..', 'views'));
  (app as any).setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();

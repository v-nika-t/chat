import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const url_web = configService.get('URL_WEB');
  app.enableCors({
    origin: url_web,
  });
  await app.listen(port);
}
bootstrap();

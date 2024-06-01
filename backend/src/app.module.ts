import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ChatModule, MessagesModule, ConfigModule.forRoot()],
})
export class AppModule {}

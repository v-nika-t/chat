import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { Injectable } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';
import { ISubjectData } from 'src/messages/DTO/message.dto';

@Injectable()
@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  wss: Server;

  constructor(private readonly messagesService: MessagesService) {
    this.messagesService.messagesUpdated$.subscribe((data: ISubjectData) => {
      this.broadcastMessages(data);
    });
  }

  private broadcastMessages(data: ISubjectData) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ event: 'messagesUpdated', data }));
      }
    });
  }

  afterInit(server: any) {}

  handleConnection(client: any, ...args: any[]) {
    client.send(
      JSON.stringify({
        event: 'messagesUpdated',
        data: this.messagesService.findAll(),
      }),
    );
  }

  handleDisconnect(client: any) {}

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() message: { text: string; sender: string },
  ): void {
    this.messagesService.createMessage(message.text, message.sender);
  }
}

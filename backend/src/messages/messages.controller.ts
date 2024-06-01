import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from './DTO/message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: Omit<MessageDto, 'id'>) {
    return this.messagesService.createMessage(
      createMessageDto.text,
      createMessageDto.sender,
    );
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }
}

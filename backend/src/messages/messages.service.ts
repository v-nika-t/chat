import { Injectable, Scope } from '@nestjs/common';
import { Subject } from 'rxjs';
import { MessageDto, ISubjectData } from './DTO/message.dto';

@Injectable()
export class MessagesService {
  private messages: MessageDto[] = [];
  private idCounter: number = 1;

  private messagesUpdated = new Subject<ISubjectData>();

  messagesUpdated$ = this.messagesUpdated.asObservable();

  createMessage(text: string, sender: string) {
    const addedMessage = { id: this.idCounter++, text, sender };

    let deletedMessage: MessageDto;
    if (this.messages.length >= 9) {
      deletedMessage = this.messages.shift();
    }

    this.messages.push(addedMessage);
    this.messagesUpdated.next({
      messages: this.messages,
      addedMessage,
      deletedMessage,
    });
    return addedMessage;
  }

  findAll(): MessageDto[] {
    return this.messages;
  }
}

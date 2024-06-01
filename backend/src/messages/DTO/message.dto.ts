import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export interface IMessage {
  id: number;
  text: string;
  sender: string;
}

export interface ISubjectData {
  messages: IMessage[];
  addedMessage: IMessage;
  deletedMessage: IMessage | undefined;
}

export class MessageDto {
  @IsNumber()
  id: number;

  @IsString()
  text: string;

  @IsString()
  sender: string;
}

export interface ISubjectData {
  messages: MessageDto[];
  addedMessage: MessageDto;
  deletedMessage: MessageDto | undefined;
}

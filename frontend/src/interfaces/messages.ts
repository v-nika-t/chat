export interface IMessage {
  id: number;
  text: string;
  sender: string;
}

export interface ISocketMessage {
  messages: IMessage[];
  addedMessage: IMessage;
  deletedMessage: IMessage | undefined;
}

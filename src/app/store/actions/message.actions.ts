import { EventModel } from "src/app/model/event.model";
import { MessageModel } from "src/app/model/message.model";

export class AddMessage{
  static readonly type = "[CRUD API] Add Menu";
  constructor(public payload: MessageModel){}
}

export class GetMessageParam{
  static readonly type = "[CRUD API] Get Notification Message Params";
  constructor(public id: MessageModel){}
}

export class GetMessage{
  static readonly type = "[CRUD API] Get Notification Message";
}
export class GetEvent{
  static readonly type = "[CRUD API] Get Notification Event";
}

export class GetMessageId{
  static readonly type = "[CRUD API] Get Notification Event For MessageId";
  constructor(public id: EventModel){}
}

export class GetMessageFailed {
  static readonly type = "[Menu API] Message Failed";
  constructor(public payload: string) {}
}

export class SetSelectedMenu{
  static readonly type = "[CRUD API] Set Selected Menu";
  constructor(public id: string){}
}

export class UpdateMenu{
  static readonly type = "[CRUD API] Update Menu";
  constructor(public payload: MessageModel){}
}
export class PromoteMenu{
  static readonly type = "[CRUD API] Update Menu";
  constructor(public payload: MessageModel){}
}

export class UpdateMessage{
  static readonly type = "[CRUD API] Update Message";
  constructor(public payload: MessageModel | any){}
}

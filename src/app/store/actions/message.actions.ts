import { GenericModel } from "src/app/model/generic.model";
import { MessageModel } from "src/app/model/message.model";

// ------------------------------------------------------------
export class AddMessage{
  static readonly type = "[CRUD API] Add Menu";
  constructor(public payload: GenericModel){}
}

export class GetMenu{
  static readonly type = "[CRUD API] Get Menu";
}

export class GetMessage{
  static readonly type = "[CRUD API] Get Notification Message";
  constructor(public id: MessageModel){}
}

export class GetMessageTeste{
  static readonly type = "[CRUD API] Get Test";
  constructor(public id: MessageModel){}
}

export class SetSelectedMenu{
  static readonly type = "[CRUD API] Set Selected Menu";
  constructor(public id: number){}
}

export class DeleteMenu{
  static readonly type = "[CRUD API] Delete Menu";
  constructor(public id: number){}
}

export class UpdateMenu{
  static readonly type = "[CRUD API] Update Menu";
  constructor(public payload: MessageModel){}
}

export class SearchMenu{
  static readonly type = "[CRUD API] Search Menu";
  constructor(public payload: MessageModel){}
}

// ------------------------------------------------------------

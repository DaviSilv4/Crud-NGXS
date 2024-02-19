import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ListViewContent } from "../model/list.model";
import { ListViewDefault } from "./list-view-default";

@Injectable()
export class ListViewAdapter{
  readonly defaultListViewContent = ListViewDefault.getContent();

  public getContent(): ListViewContent{
    // switch(dsakda)
    //   case asaa:
    //     ...this.defaultListViewContent,
    //     message: "sdad"
    //   default:
    //     ...this.defaultListViewContent
    return {...this.defaultListViewContent};
  }
}

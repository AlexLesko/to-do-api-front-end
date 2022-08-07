import { ToDoModel } from "./to-do-list";

export class UserModel {
    id ?: number;
    name = "";
    userRight = "";
    toDoList : Array<ToDoModel> = new Array<ToDoModel>();
    imageTitle : string = "";
    imageData ?: any;
}
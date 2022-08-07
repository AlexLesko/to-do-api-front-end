import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserModel } from 'src/app/models/user-model';
import { ToDoModel } from 'src/app/models/to-do-list';

@Component({
  selector: 'app-edit-user-model',
  templateUrl: './edit-user-model.component.html',
  styleUrls: ['./edit-user-model.component.scss']
})
export class EditUserModelComponent implements OnInit {
  @Input() user?: UserModel;
  @Output() usersUpdated = new EventEmitter<UserModel[]>();

  taskList ?: ToDoModel[];
  taskToModify : ToDoModel = new ToDoModel();
  openEditWindow : boolean = false;
  users : UserModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {userModel: UserModel},private userService: UserService, private dialogRef: MatDialogRef<EditUserModelComponent>) { 
    this.user = data.userModel;
    this.taskList = data.userModel.toDoList;
  }

  ngOnInit(): void {}

  AddNewTask() {
    this.taskToModify = new ToDoModel();
    this.openEditWindow = true;
    this.taskToModify.UsersId = this.user?.id;
  }

  CreateTask() {
    this.userService.createTask(this.taskToModify).subscribe((updatedUser: UserModel[]) => {
      this.user = updatedUser.find(x => x.id == this.user?.id);
      this.taskList = this.user?.toDoList;
      this.users = updatedUser;
      this.openEditWindow = false;
    });
  }

  EditTask(task: ToDoModel) {
    this.taskToModify = task;
    this.openEditWindow = true;
  }

  SaveTask(task: ToDoModel) {
    this.taskToModify = task;

    this.userService.saveTask(this.taskToModify).subscribe((updatedUser: UserModel[]) => {
      this.user = updatedUser.find(x => x.id == this.user?.id);
      this.taskList = this.user?.toDoList;
      this.users = updatedUser;

      this.openEditWindow = false;
    });
  }

  CancelEditMode() {
    this.openEditWindow = false;
  }

  DeleteTask(task: ToDoModel) {
    this.taskToModify = task;

    this.userService.deleteTask(this.taskToModify).subscribe((updatedUser: UserModel[]) => {
      this.user = updatedUser.find(x => x.id == this.user?.id);
      this.taskList = this.user?.toDoList;
      this.users = updatedUser;

      this.openEditWindow = false;
    });
  }
}

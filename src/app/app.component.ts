import { Component } from '@angular/core';
import { UserModel } from './models/user-model';
import { UserService } from './service/user.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditUserModelComponent } from './components/edit-user-model/edit-user-model.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'to-do-api-front-end';
  users: UserModel[] = [];
  userToEdit?: UserModel;

  constructor(private userModelService: UserService, private matDialog: MatDialog) {}

  ngOnInit() : void {
    this.userModelService.getUsers().subscribe((result: UserModel[]) => {(this.users = result);console.log(result)});
  }

  updateUserList(users: UserModel[]) {
    this.users = users;
  }

  createNewUser() {
    this.userToEdit = new UserModel();

    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.matDialog.open(EditUserComponent, {
      width: '50%', data: {user: this.userToEdit}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.users = result.data;
      console.log(result);
    })
  }

  editUser(user: UserModel) {
    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.matDialog.open(EditUserComponent, {
      width: '50%', data: {user: user}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.users = result.data;
      console.log(result);
    })
  }

  deleteUser(user: UserModel) {
    this.userModelService.deleteUser(user).subscribe((result: UserModel[]) => (this.users = result));
  }

  openUserModel(user: UserModel) {
    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.matDialog.open(EditUserModelComponent, {
      width: '50%', data: {userModel: user}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.userModelService.getUsers().subscribe((result: UserModel[]) => this.users = result);
    })
  }

}

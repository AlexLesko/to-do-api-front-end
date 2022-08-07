import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/service/user.service';
import { EditUserModelComponent } from '../edit-user-model/edit-user-model.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user : UserModel = new UserModel();
  title = 'to-do-api-front-end';
  users: UserModel[] = [];
  userToEdit?: UserModel;

  constructor(private router: Router, private userModelService: UserService, private matDialog: MatDialog) {
    let routerData = this.router.getCurrentNavigation()?.extras.state;
    if(routerData)
    {
      this.user = routerData as UserModel;
      userModelService.getFilteredUser(this.user).subscribe(result => this.users = result);
    }
  }

  ngOnInit() : void {
    this.userModelService.getUsers().subscribe((result: UserModel[]) => {(this.users = result)});
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

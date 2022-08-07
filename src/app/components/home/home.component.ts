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
      userModelService.getFilteredUser(this.user).subscribe(result => {console.log(result);this.users = result;});
    }
    else
    {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() : void {}

  updateUserList(users: UserModel[]) {
    this.users = users;
  }

  logout()
  {
    this.router.navigate(['login']);
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
    this.userModelService.deleteUser(this.user.name ,user).subscribe((result: UserModel[]) => {
      if(result != null)
      {
        this.users = result;
      }
      else
      {
        this.router.navigate(['login']);
      }
    });
  }

  openUserModel(user: UserModel) {
    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.matDialog.open(EditUserModelComponent, {
      width: '50%', data: {userModel: user, loggedUser: this.user}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.userModelService.getFilteredUser(this.user).subscribe((result: UserModel[]) => this.users = result);
    })
  }

}

import { Component, Inject, Input, OnInit, Output, resolveForwardRef, ViewEncapsulation } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/service/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditUserComponent {
  @Input() user?: UserModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: UserModel},private userService: UserService, private dialogRef: MatDialogRef<EditUserComponent>) { 
    this.user = data.user;
  }

  ngOnInit(): void {}

  saveUser(user: UserModel) {
    this.userService.saveUser(user).subscribe((users: UserModel[]) => this.passDataAndClose(users))
  }

  deleteUser(user: UserModel) {
    this.userService.deleteUser(this.user!.name, user).subscribe((users: UserModel[]) => this.passDataAndClose(users))
  }

  passDataAndClose(users: any) {
    this.dialogRef.close({data: users})
  }

  onFileSelected(event: any) {
    const file : File = event.target.files[0];

    if(file)
    {
      this.user!.imageTitle = file.name;
      console.log(file);
      this.GetBase64Array(file).then(data => this.user!.imageData = data);
    }
  }

  GetByteArray(dataURI : any) {
    var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
  return array;
  }

  GetBase64Array(file : any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}



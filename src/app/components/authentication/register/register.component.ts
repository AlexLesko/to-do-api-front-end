import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthModel } from 'src/app/models/user-auth-request';
import { UserModel } from 'src/app/models/user-model';
import { UserRegisterModel } from 'src/app/models/user-register';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: UserModel = new UserModel;
  userAuth: UserAuthModel = new UserAuthModel;
  register: any = FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      userRight: ['', Validators.required]
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.user.imageTitle = file.name;
      this.GetBase64Array(file).then(data => this.user.imageData = data);
    }
  }

  createUser(data: any)
  {
    let userRegister = new UserRegisterModel();

    let userAuth = new UserAuthModel();
    userAuth.userName = data.userName;
    userAuth.password = data.password;

    let user = new UserModel();
    user.name = data.userName;
    user.userRight = data.userRight;
    user.imageData = this.user.imageData;
    user.imageTitle = this.user.imageTitle;

    userRegister.users = user;
    userRegister.userRequest = userAuth;

    this.authService.registerUser(userRegister).subscribe(data => this.router.navigateByUrl('/home', {state: data}));
    
  }

  GetBase64Array(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  goToLogin()
  {
    this.router.navigate(['login']);
  }

}

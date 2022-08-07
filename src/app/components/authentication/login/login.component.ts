import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthModel } from 'src/app/models/user-auth-request';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any = FormGroup;
  
  constructor(private formBuilder: FormBuilder,private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginUser(data: any)
  {
    let userAuth = new UserAuthModel();
    userAuth.userName = data.userName;
    userAuth.password = data.password;

    this.authService.loginUser(userAuth).subscribe(data => {console.log(data);this.router.navigateByUrl('/home', {state: data})});
  }

  goToRegister()
  {
    this.router.navigate(['register']);
  }

}

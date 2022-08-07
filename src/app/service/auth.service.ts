import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ToDoModel } from '../models/to-do-list';
import { UserAuthModel } from '../models/user-auth-request';
import { UserModel } from '../models/user-model';
import { UserRegisterModel } from '../models/user-register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private baseUrl = "Authorize"

  public registerUser(userRegister: UserRegisterModel) : Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/${this.baseUrl}/Register`, userRegister);
  }

  public loginUser(userRequest: UserAuthModel) : Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/${this.baseUrl}/Login`, userRequest);
  }
}
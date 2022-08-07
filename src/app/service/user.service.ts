import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ToDoModel } from '../models/to-do-list';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private baseUrl = "User"

  public getUsers() : Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}`);
  }

  public getSingleUser(user: UserModel) : Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/${user.id}`);
  }

  public saveUser(user: UserModel) : Observable<UserModel[]> {
    return this.http.put<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}`, user);
  }

  public createUser(user: UserModel) : Observable<UserModel[]> {
    return this.http.post<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/CreateUser`, user);
  }

  public deleteUser(user: UserModel) : Observable<UserModel[]> {
    return this.http.delete<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/${user.id}`);
  }

  public saveTask(task: ToDoModel) : Observable<UserModel[]> {
    return this.http.put<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/UpdateTask`, task);
  }

  public createTask(task: ToDoModel) : Observable<UserModel[]> {
    return this.http.post<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/AddTask`, task);
  }

  public deleteTask(task: ToDoModel) : Observable<UserModel[]> {
    return this.http.delete<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/DeleteTask/${task.id}`);
  }

}

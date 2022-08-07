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

  public getFilteredUser(user: UserModel) : Observable<UserModel[]> {
    return this.http.post<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/Filtered`, user);
  }

  public saveUser(user: UserModel) : Observable<UserModel[]> {
    return this.http.put<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/${user.name}`, user);
  }
  
  public deleteUser(loggedUser: string, user: UserModel) : Observable<UserModel[]> {
    return this.http.delete<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/${loggedUser}/${user.id}`);
  }

  public saveTask(user: UserModel, task: ToDoModel) : Observable<UserModel[]> {
    return this.http.put<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/UpdateTask/${user.name}`, task);
  }

  public createTask(user: UserModel, task: ToDoModel) : Observable<UserModel[]> {
    return this.http.post<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/AddTask/${user.name}`, task);
  }

  public deleteTask(user: UserModel, task: ToDoModel) : Observable<UserModel[]> {
    return this.http.delete<UserModel[]>(`${environment.apiUrl}/${this.baseUrl}/DeleteTask/${user.name}/${task.id}`);
  }

}

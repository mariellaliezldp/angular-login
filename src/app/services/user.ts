import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel, UserRegister } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(userData: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(
      'https://api.freeprojectapi.com/api/UserApp/CreateNewUser',
      userData
    );
  }

  loginUser(userData: LoginModel) :Observable<UserRegister> {
    return this.http.post<UserRegister>('https://api.freeprojectapi.com/api/UserApp/login', userData)
  }
}

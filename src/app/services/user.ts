import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel, UserRegister } from '../model/user.model';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth: Auth = inject(Auth); // <-- correct inject
  constructor(private http: HttpClient) {}

  // Optional: call your backend API
  // registerUser(userData: UserRegister): Observable<UserRegister> {
  //   return this.http.post<UserRegister>(
  //     'https://api.freeprojectapi.com/api/UserApp/CreateNewUser',
  //     userData
  //   );
  // }

  // loginUser(userData: LoginModel): Observable<UserRegister> {
  //   return this.http.post<UserRegister>(
  //     'https://api.freeprojectapi.com/api/UserApp/login',
  //     userData
  //   );
  // }

  // Firebase email/password auth
  async registerWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.apiUrl;

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public generateToken(loginData: any) {
    return this.http.post(`${this.baseUrl}/generate-token`, loginData);
  }

  public loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggednIn() {
    let tokenStr = this.getToken();
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getUserActive() {
    let user = this.getUser();
    return user.active;
  }

  public getCurrentUser() { 
    return this.http.get<any>(`${this.baseUrl}/actual-usuario`);
  }

  public resetPassword(email: any) {
    return this.http.post(`${this.baseUrl}/forgot-password`, email);
  }

  public restablecerPassword(password: any, token: any) {
    return this.http.post(`${this.baseUrl}/restablecer-contra`, { newPassword: password, token: token });
  }

  public changePassword(data : any) {
    return this.http.post(`${this.baseUrl}/cambiar-contra`, data);
  }

  public verificarToken(token: string) {
    return this.http.post(`${this.baseUrl}/validate-password-token`, { token: token });
  }
}


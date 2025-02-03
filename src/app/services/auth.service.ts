import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Credentials } from '../models/credentials';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  private userSource = new BehaviorSubject<string | null>(null); // guarda o usuário logado
  currentuser = this.userSource.asObservable(); // Acompanha mudanças

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  authenticate(creds: Credentials){
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds,{
      observe: 'response',
      responseType: 'text'
    })
  }

  successfulLogin(authToken: string){
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(){
    let token = localStorage.getItem('token')
    if(token != null ) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false;
  }

  login(username: string): void {
    localStorage.setItem('logged', username);
    this.userSource.next(username); // Atualiza o usuário logado
  }

  logout(){
    localStorage.removeItem('logged');
    this.userSource.next(null); //Remove o usuário ao deslogar
    localStorage.clear();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('logged');
    if (storedUser) {
      this.userSource.next(storedUser); // Atualiza o BehaviorSubject com o usuário salvo
    }
  }
}

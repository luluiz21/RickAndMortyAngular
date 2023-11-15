import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  constructor() { }
  
  // Mock do login
  login(username: string, password: string): Observable<boolean> {
    // Aqui você pode adicionar condições de verificação para o username e password
    if (username === 'admin' && password === 'admin') {
      this.loggedIn.next(true);
      return of(true).pipe(delay(1000));
    }
    return of(false);
  }
  
  // Método para verificar se o usuário está logado
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  
  // Logout
  logout() {
    this.loggedIn.next(false);
  }
  
  
}

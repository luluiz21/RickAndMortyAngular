import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  constructor() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    this.loggedIn.next(isLoggedIn);
  }
  
  login(username: string, password: string): Observable<boolean> {
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    const userExists = users.some((user: { username: string; password: string; }) => user.username === username && user.password === password);
    if (userExists) {
      sessionStorage.setItem('isLoggedIn', 'true');
      this.loggedIn.next(true);
      return of(true);
    } else {
      return of(false);
    }
  }

  register(username: string, password: string): Observable<boolean> {
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    users.push({ username, password });
    sessionStorage.setItem('users', JSON.stringify(users));
    return of(true); 
  }
  
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  
  
  logout() {
    sessionStorage.removeItem('isLoggedIn');
    this.loggedIn.next(false);
  }
  
  
}

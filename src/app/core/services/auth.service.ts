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
  
  /*  Login   */
  login(username: string, password: string): Observable<boolean> {
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    const userExists = users.some((user: { username: string; password: string; }) => user.username === username && user.password === password);
    //verifica se o usuário existe no session storage
    if (userExists) {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('activeUsername', username);
      this.loggedIn.next(true);
      return of(true);
    } else {
      return of(false);
    }
  }
  /* Cadastrar usuário */
  register(username: string, password: string): Observable<boolean> {
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    let validValue = true;
    // verificação se já existe o nome de usuário
    users.map((user: { username: string; }) => {
      if(user.username === username){
          validValue = false;
      }
    })
    if(validValue === true){
      users.push({ username, password });
      sessionStorage.setItem('users', JSON.stringify(users));
    }
   
    
    
    return of(validValue); 
  }

  /* Trocar username */
  changeUsername(oldUsername: string, newUsername: string):  Observable<{ success: boolean; message: string }> {
    /* Os campos não podem ser vazio */
    if (!oldUsername.trim() || !newUsername.trim()) {
      return of({ success: false, message: 'Old username and new username fields cannot be empty.' });
    }
    /* O novo username tem que ser diferente do antigo */
    if (oldUsername === newUsername) {
      return of({ success: false, message: 'The new username cannot be the same as the old username.' });
    }

    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    const userExists = users.some((user: { username: string; }) => user.username === newUsername);

    /* Verificando se já existe o username escolhido */
    if (userExists) {
      return of({ success: false, message: 'The new username is already taken.' });
    }

    /* Verificação se o nome de usuário atual existe  para realizar a troca*/
    const userIndex = users.findIndex((user: { username: string; }) => user.username === oldUsername);
    if (userIndex !== -1) {
      users[userIndex].username = newUsername;
      sessionStorage.setItem('users', JSON.stringify(users));
      sessionStorage.setItem('activeUsername', newUsername);
      return of({ success: true, message: 'Username changed successfully.' });
    } else {
      return of({ success: false, message: 'User not found.' });
    }
  }
  /* Retorna o username ativo */
  getActiveProfile(): string{
    return sessionStorage.getItem('activeUsername') || ''
  }
  /* Troca de senha */
  changePassword(username: string, oldPassword: string, newPassword: string):  Observable<{ success: boolean; message: string }>{
    /* Os campos nao podem ser vazio */
    if (!username.trim() || !oldPassword.trim() || !newPassword.trim()) {
      return of({ success: false, message: 'Username, old password, and new password fields cannot be empty.' });
    }

    /* A senha nova não pode ser igual a antiga */
    if (oldPassword === newPassword) {
      return of({ success: false, message: 'The new password cannot be the same as the old password.' });
    }

    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((user: { username: string; password: string; }) => user.username === username);
    /* Verificando se o usuário e senha antiga existem para realizar a troca */
    if (userIndex !== -1 && users[userIndex].password === oldPassword) {
      users[userIndex].password = newPassword;
      sessionStorage.setItem('users', JSON.stringify(users));
      return of({ success: true, message: 'Password changed successfully.' });
    } else if (userIndex !== -1) {
      return of({ success: false, message: 'The old password is incorrect.' });
    } else {
      return of({ success: false, message: 'User not found.' });
    }
  }
  /* Retorna se o usuário está logado */
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  
  /* Logout */
  logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('activeUsername');
    this.loggedIn.next(false);
  }
  
  
}

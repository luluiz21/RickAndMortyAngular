import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private usernameSource = new BehaviorSubject<string>('');

  currentUsername = this.usernameSource.asObservable();

  constructor() { }
  /* Serviço criado para acompanhar a troca de username e mudar no Menu Dropdown da Navbar */
  attUsername(username: string) {
    this.usernameSource.next(username);
  }

}

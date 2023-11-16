import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RickAndMorty';
  showNavbar: boolean = true;
  showFilterBar: boolean = true;
  activeUser: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
    ) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // A lógica para decidir quando mostrar o navbar
      this.showNavbar = !['/register', '/login'].some(path => event.url.startsWith(path));
      // A lógica para decidir quando mostrar o filterbar
      this.showFilterBar = ['/characters', '/locations', '/episodes'].some(path => event.url.endsWith(path));
      
    });
  }


}
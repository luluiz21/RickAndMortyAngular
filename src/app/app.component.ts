import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RickAndMorty';
  showNavbar: boolean = true;

  constructor(private router: Router) {
    // Inscrever-se para eventos de navegação
    this.router.events.pipe(
      // Filtrar apenas eventos do tipo NavigationEnd
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // A lógica para decidir quando mostrar o navbar
      this.showNavbar = !event.urlAfterRedirects.startsWith('/login');
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  activeLink: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
    ) { 
    router.events.subscribe((val) => {
      this.activeLink = router.url;
    });
  }

  ngOnInit() {
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  logout(){
    this.authService.logout();
  }
}

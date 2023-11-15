import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  activeLink: string = '';

  constructor(private router: Router) { 
    router.events.subscribe((val) => {
      this.activeLink = router.url;
    });
  }

  ngOnInit() {
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}

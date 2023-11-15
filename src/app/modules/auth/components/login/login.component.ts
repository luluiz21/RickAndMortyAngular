import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  showPortalAnimation: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }
  
  onSubmit() {
    this.showPortalAnimation = true;

    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['']);
      } else {
        this.showPortalAnimation = false; 
        alert('Login failed');
      }
    });
  }


}

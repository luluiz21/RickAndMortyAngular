import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUsername: string = '';
  newPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegister() {
    this.authService.register(this.newUsername, this.newPassword).subscribe(success => {
      if (success) {
        alert('Registro bem-sucedido. Faça login.');
        this.router.navigate(['login']);
      } else {
        alert('Falha no registro. Tente novamente.');
      }
    });
  }

}

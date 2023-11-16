import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  newUsername: string = '';
  newPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }
  /* Envia os dados do formulário para o serviço de register para entrar cadastrar o usuário */
  onRegister() {
    this.authService.register(this.newUsername, this.newPassword).subscribe(success => {
      console.log(success);
      
      if (success) {
        alert('Registration successful. Please log in.');
        this.router.navigate(['login']);
      } else {
        alert('User already exists');
      }
    });
  }
  /* Vai para o login */
  goToLogin(): void {
    this.router.navigate(['/login']); 
  }

}

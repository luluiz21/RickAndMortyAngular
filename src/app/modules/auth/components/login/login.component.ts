import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  username: string = '';
  password: string = '';
  showPortalAnimation: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  /* Envia os dados do formulário para o serviço de login para entrar na aplicação */
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
  /* Envia o usuário para o cadastro */
  goToRegister(): void {
    this.router.navigate(['/register']); 
  }


}

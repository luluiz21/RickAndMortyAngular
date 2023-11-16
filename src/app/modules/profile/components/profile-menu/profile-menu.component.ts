import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {
  username: string = ''; // Este valor deve vir do estado da aplicação ou serviço
  newUsername: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  showUsernameChange: boolean = false;
  showPasswordChange: boolean = false;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getUsername();
    
  }
  /* Atribui o username de acodo com o perfil ativo */
  getUsername(){
    this.username = this.authService.getActiveProfile();
  }
  /* Função para trocar o username */
  confirmUsernameChange(): void {
    this.authService.changeUsername(this.username, this.newUsername).subscribe(response => {
      alert(response.message);
      if (response.success) {
        this.username = this.newUsername;
        this.profileService.attUsername(this.newUsername);
        this.showUsernameChange = false;
      } 
    });
    
  }
  /* Função para troca a senha */
  confirmPasswordChange(): void {
    this.authService.changePassword(this.username, this.oldPassword, this.newPassword).subscribe(response => {
      alert(response.message);
      if (response.success) {
        this.showPasswordChange = false;
      }
    });
  }
  /* Controle da div com o input para troca do username */
  toggleUsernameChange(): void {
    this.showUsernameChange = !this.showUsernameChange;
  }
  /* Controle da div com os inputs para troca da senha */
  togglePasswordChange(): void {
    this.showPasswordChange = !this.showPasswordChange;
  }

}

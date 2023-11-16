import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeLink: string = '';
  username: string = '';
  isMenuCollapsed = true;
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
    ) { 
    router.events.subscribe((val) => {
      this.activeLink = router.url;
    });
  }
  

  ngOnInit() {
    /* subscribe do serviço para acompanhar as mudanças do username atual */
    this.profileService.currentUsername.subscribe(username => this.username = username);
    this.getActiveMember();
  }
  /* pega o username do usuário ativo */
  getActiveMember(){
    this.username = this.authService.getActiveProfile();
  }
  /* vai até o caminho escolhido */
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  /* Faz o logout e vai para tela de login */
  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
    
  }
}

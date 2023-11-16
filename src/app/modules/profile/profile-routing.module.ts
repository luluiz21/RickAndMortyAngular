import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';

const routes: Routes = [
  { path: '', component: ProfileMenuComponent }
];


  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ProfileRoutingModule { }

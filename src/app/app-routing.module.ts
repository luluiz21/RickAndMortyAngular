import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './modules/characters/characters.component';
import { LocationsComponent } from './modules/locations/locations.component';
import { EpisodesComponent } from './modules/episodes/episodes.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardHomeComponent } from './modules/dashboard/components/dashboard-home/dashboard-home.component';

const routes: Routes = [
  { path: 'characters', loadChildren: () => import('./modules/characters/characters.module').then(m => m.CharactersModule) },
  { path: 'locations', loadChildren: () => import('./modules/locations/locations.module').then(m => m.LocationsModule) },
  { path: 'episodes', loadChildren: () => import('./modules/episodes/episodes.module').then(m => m.EpisodesModule) },
  { path: '', component: DashboardHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

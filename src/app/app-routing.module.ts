import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './modules/dashboard/components/dashboard-home/dashboard-home.component';
import { canActivate } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'characters',
    loadChildren: () => import('./modules/characters/characters.module').then(m => m.CharactersModule),
    canActivate:[canActivate]
  },
  { path: 'locations',
    loadChildren: () => import('./modules/locations/locations.module').then(m => m.LocationsModule),
    canActivate:[canActivate]
  },
  { path: 'episodes',
    loadChildren: () => import('./modules/episodes/episodes.module').then(m => m.EpisodesModule),
    canActivate:[canActivate]
  },
  { path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate:[]
  },
  { path: '', 
     loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate:[canActivate]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

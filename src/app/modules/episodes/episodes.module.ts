import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesComponent } from './episodes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EpisodesDetailsComponent } from './components/episodes-details/episodes-details.component';
import { EpisodesListComponent } from './components/episodes-list/episodes-list.component';
import { EpisodesRoutingModule } from './episodes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EpisodesRoutingModule
  ],
  declarations: [
    EpisodesComponent,
    EpisodesDetailsComponent,
    EpisodesListComponent
  ]
})
export class EpisodesModule { }

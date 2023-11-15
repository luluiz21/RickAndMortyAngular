import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { CharacterRoutingModule } from './character-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CharacterRoutingModule
  ],
  declarations: [
    CharactersListComponent,
    CharacterDetailsComponent
  ]
})
export class CharactersModule { }

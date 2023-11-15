import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { TableComponent } from './components/table/table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    NavbarComponent,
    InfiniteScrollDirective,
    TableComponent,
    ItemCardComponent,
    FilterBarComponent
  ],
  declarations: [
    FilterBarComponent,
    NavbarComponent,
    ItemCardComponent,
    InfiniteScrollDirective,
    TableComponent, 
    ItemCardComponent
  ]
})
export class SharedModule { }

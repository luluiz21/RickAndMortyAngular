import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationRoutingModule } from './locations-routing.module';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LocationRoutingModule
  ],
  declarations: [
    LocationsComponent,
    LocationsListComponent,
    LocationDetailsComponent
  ]
})
export class LocationsModule { }

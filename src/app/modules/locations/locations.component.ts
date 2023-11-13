import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes(): void{
    this.locationService.getLocations().subscribe(
      ((data) =>{
        console.log(data.results);
        
      }),
      ((error) =>{
        console.error(error);
      })
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {

  locations: Location[] = [];
  nextPage = 2;
  hasNextPage = true;
  locationColumns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'dimension', title: 'Dimension'},
    { key: 'type', title: "Type"}
  ];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.loadLocation();
  }

  loadLocation(): void {
    this.locationService.getLocations().subscribe(
      ((data) => {
        this.locations = data.results;
        console.log(this.locations);
        
      }),
      (error) => console.error(error)
    );
  }

  loadMoreLocations():void {
    console.log('teste');
    if(this.hasNextPage){

      this.locationService.getLocations(this.nextPage.toString()).subscribe(
        ((data) => {
          this.locations.push(...data.results);
          console.log(this.locations);
          this.nextPage++;
          if(data.info.next === null){
            this.hasNextPage = false;
          }
        }),
        (error) => console.error(error)
      );
    }
  }

}

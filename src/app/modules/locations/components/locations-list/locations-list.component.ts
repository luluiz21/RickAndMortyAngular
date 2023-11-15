import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/core/services/filter.service';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit, OnDestroy {

  @ViewChild('scrollContainer') private scrollContainer: ElementRef | undefined;

  private searchSubscription: Subscription | undefined;
  filterName: string = '';
  locations: Location[] = [];
  nextPage = 2;
  hasNextPage = true;
  locationColumns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'dimension', title: 'Dimension'},
    { key: 'type', title: "Type"}
  ];

  constructor(
    private locationService: LocationService,
    private filterService: FilterService
    ) { }

  ngOnInit() {
    this.searchSubscription = this.filterService.getSearchTerm().subscribe(term => {
      this.applyFilter(term);
    });
    /* this.loadLocation(); */
  }

  applyFilter(term: string) {
    
    this.locationService.getLocations(undefined, term).subscribe(
      ((data) => {
        this.filterName = term;
        this.locations = data.results;
        this.resetScroll();
        if(data.info.next !== null){
          this.nextPage = 2;
          this.hasNextPage = true;
        }
        console.log(this.locations);
      }),
      (error) => console.error(error)
    );
  }

  resetScroll() {
    console.log(this.scrollContainer);
    if (this.scrollContainer) {
      console.log(this.scrollContainer.nativeElement);
      
      this.scrollContainer.nativeElement.scrollTop = 0;
    }
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

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

}

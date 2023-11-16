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
  }
  /* Aplica o filtro pelo nome colocado na filtragem */
  applyFilter(term: string) {
    
    this.locationService.getLocations(undefined, term).subscribe(
      ((data) => {
        this.filterName = term;
        this.locations = data.results;
        /* Reseta o scroll do mouse de acordo com a filtragem */
        this.resetScroll();
        if(data.info.next !== null){
          this.nextPage = 2;
          this.hasNextPage = true;
        }
      }),
      (error) => {
          if(error.status === 404){
            this.locations = [];
          }
      });
  }
  /* Reseta o scroll do mouse */
  resetScroll() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    }
  }
  /* Carrega mais dados da API de acordo com o parametro page  */
  loadMoreLocations():void {
    if(this.hasNextPage){

      this.locationService.getLocations(this.nextPage.toString()).subscribe(
        ((data) => {
          this.locations.push(...data.results);
          this.nextPage++;
          if(data.info.next === null){
            this.hasNextPage = false;
          }
        }),
        (error) => {
          console.error(error)
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

}

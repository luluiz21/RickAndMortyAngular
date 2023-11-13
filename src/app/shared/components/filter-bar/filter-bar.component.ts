import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterService } from 'src/app/core/services/filter.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  
  @Output() search = new EventEmitter<string>();

  
  constructor(private filterService: FilterService) { }

  ngOnInit() {
  }

  onSearch(_event: Event): void {
    const searchTerm = (_event.target as HTMLInputElement).value;
    this.filterService.setSearchTerm(searchTerm);
  }

}

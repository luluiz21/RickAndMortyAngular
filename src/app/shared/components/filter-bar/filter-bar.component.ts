import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterService } from 'src/app/core/services/filter.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  
  constructor(private filterService: FilterService) { }

  ngOnInit() {
  }
  /* Pega o nome que está no filtro de acordo com evento Input */
  onSearch(_event: Event): void {
    const searchTerm = (_event.target as HTMLInputElement).value;
    /* Envia o nome para o serviço para controle das tabelas */
    this.filterService.setSearchTerm(searchTerm);
  }

}

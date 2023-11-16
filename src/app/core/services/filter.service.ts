import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/* Feito para controlar o filtro entre as listagens */
export class FilterService {
  private searchSubject = new BehaviorSubject<string>('');

  constructor() { }

  /* Feito para setar o nome que está na filtragem */
  setSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
  /* Feito para buscar o nome que está na filtragem*/
  getSearchTerm() {
    return this.searchSubject.asObservable();
  }


}

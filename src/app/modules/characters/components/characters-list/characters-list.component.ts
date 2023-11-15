import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterService } from 'src/app/core/services/character.service';
import { FilterService } from 'src/app/core/services/filter.service';
import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {

  @ViewChild('scrollContainer') private scrollContainer: ElementRef | undefined;

  private searchSubscription: Subscription | undefined;
  filterName: string = '';
  characters: Character[] = [];
  nextPage = 2;
  hasNextPage = true;
  characterColumns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'status', title: 'Status'},
    { key: 'species', title: "Specie"}
  ];

  constructor(
    private characterService: CharacterService,
    private filterService: FilterService
    ) { }

  ngOnInit() {
    this.searchSubscription = this.filterService.getSearchTerm().subscribe(term => {
      this.applyFilter(term);
    });
    /* this.loadCharacters(); */
  }

  applyFilter(term: string) {
    
    this.characterService.getCharacters(undefined, term).subscribe(
      ((data) => {
        this.filterName = term;
        this.characters = data.results;
        this.resetScroll();
        if(data.info.next !== null){
          this.nextPage = 2;
          this.hasNextPage = true;
        }
        console.log(this.characters);
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

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe(
      ((data) => {
        this.characters = data.results;
        console.log(this.characters);
        
      }),
      (error) => console.error(error)
    );
  }

  loadMoreCharacters():void {
    console.log('teste');
    if(this.hasNextPage){

      this.characterService.getCharacters(this.nextPage.toString(), this.filterName).subscribe(
        ((data) => {
          this.characters.push(...data.results);
          console.log(this.characters);
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

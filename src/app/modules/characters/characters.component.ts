import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/core/services/character.service';
import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  nextPage = 2;
  hasNextPage = true;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.loadCharacters();
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

      this.characterService.getCharacters(this.nextPage.toString()).subscribe(
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

}

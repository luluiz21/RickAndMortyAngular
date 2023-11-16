import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { CharacterService } from 'src/app/core/services/character.service';
import { EpisodeService } from 'src/app/core/services/episode.service';
import { LocationService } from 'src/app/core/services/location.service';
import { Character } from 'src/app/shared/models/character.model';
import { Episode } from 'src/app/shared/models/episode.model';
import { Location } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  charactersCount: number = 0;
  locationsCount: number = 0;
  episodesCount: number = 0;
  randomCharacter: Character = new Character; 
  randomLocation: Location = new Location
  randomEpisode: Episode = new Episode; 
  numberOfCard: any [] = [];


  constructor(
    private characterService: CharacterService,
    private locationService: LocationService,
    private episodeService: EpisodeService
    ) { }

  ngOnInit() {
    this.loadDashboardInfo();
    
  }
  /* Faz a chamada para as informações para cada card */
  loadDashboardInfo(): void{
    this.fetchInfo(this.characterService.getCharacters(), (count) => this.characterService.getCharacter(count), 'charactersCount').subscribe(character => {
      this.randomCharacter = character;
      this.numberOfCard.push({
        title: 'characters',
        image: character.image,
        count: this.charactersCount,
        name: character.name
      });
    });
    this.fetchInfo(this.locationService.getLocations(), (count) => this.locationService.getLocation(count), 'locationsCount').subscribe(location => {
      this.randomLocation = location;
      this.numberOfCard.push({
        title: 'locations',
        image: '../../../../../assets/images/rick-and-morty-random-1.png',
        count: this.locationsCount,
        name: location.name
      });
    });
    this.fetchInfo(this.episodeService.getEpisodes(), (count) => this.episodeService.getEpisode(count), 'episodesCount').subscribe(episode => {
      this.randomEpisode = episode;
      this.numberOfCard.push({
        title: 'episodes',
        image: '../../../../../assets/images/rick-and-morty-random-2.png',
        count: this.episodesCount,
        name: episode.name
      });
    });

  }

  /* É um método genérico para reutilização para buscas de dados das diferentes entidades (Character, Episode, Location). 
  Primeiro ele chama a API para pegar informações da quantidade de dados
  Depois ele faz a chamada por ID de acordo com o count  */
  fetchInfo<T>(fetchFunction: Observable<any>, fetchItemFunction: (res: number) => Observable<T>, countPropertyName: keyof DashboardHomeComponent): Observable<T> {
    return fetchFunction.pipe(
      switchMap(data => {
        this[countPropertyName] = data.info.count;
        /* Pega o valor aleatório de acordo com o count da API */
        const randomNumber = Math.floor(Math.random() * data.info.count) + 1;
        return fetchItemFunction(randomNumber);
      })
    );
  }
  
}

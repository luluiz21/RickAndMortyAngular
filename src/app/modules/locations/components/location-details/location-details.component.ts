import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/core/services/character.service';
import { EpisodeService } from 'src/app/core/services/episode.service';
import { LocationService } from 'src/app/core/services/location.service';
import { Location } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  location: Location | undefined;
  charactersNames: { 
    [url: string]: string | undefined,
  } = {};
  charactersImage: { 
    [url: string]: string | undefined,
  } = {};
  selectedCharacterImage: string | undefined;
  selectedCharacterName: string | undefined;

  constructor(
    private characterService: CharacterService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    /* Pega o id pela rota */
    this.getDetailsLocation(this.route.snapshot.params["id"]);
  }
  /* Pega os detalhes do local pelo id */
  getDetailsLocation(id: number){
    this.locationService.getLocation(id).subscribe(
      (data)=>{
        this.location = data;
        data?.residents.forEach((episodeUrl: string) => this.getCharacterName(episodeUrl));
      },
      (error)=>{
        console.error(error)
      }
    )
  }
  /* pega os residentes do local */
  getCharacterName(episodeUrl: string): void {
    if (!this.charactersNames[episodeUrl]) {
      this.characterService.getCharacterWithUrl(episodeUrl).subscribe(
        (data) => {
          this.charactersNames[episodeUrl] = data.name;
          this.charactersImage[episodeUrl] = data.image;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  /* Vai para os detalhes do residente de acordo com a url que veio da resposta da API */
  goToDetails(episodeUrl: string | undefined): void { 
    let url = episodeUrl?.split('/');
    
    const detailsId = url?.pop();
    const detailsName = url?.pop();
    
    this.router.navigate([`/${detailsName}s`, detailsId]);
  }

  /* Controlador da div da imagem do residente */
  showImage(characterUrl: string | undefined, characterName: string | undefined): void {
    this.selectedCharacterImage = characterUrl;
    this.selectedCharacterName = characterName;
  }
  /* Controlador da div da imagem do residente */
  hideImage(): void {
    this.selectedCharacterImage = undefined;
    this.selectedCharacterName = undefined;
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/core/services/character.service';
import { EpisodeService } from 'src/app/core/services/episode.service';
import { Episode } from 'src/app/shared/models/episode.model';

@Component({
  selector: 'app-episodes-details',
  templateUrl: './episodes-details.component.html',
  styleUrls: ['./episodes-details.component.css']
})
export class EpisodesDetailsComponent implements OnInit {

  episode: Episode | undefined;
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
    private episodeService: EpisodeService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.getDetailsEpisode(this.route.snapshot.params["id"]);
  }
  getDetailsEpisode(id: number){
    this.episodeService.getEpisode(id).subscribe(
      (data)=>{
        this.episode = data;
        data?.characters.forEach((episodeUrl: string) => this.getCharacterName(episodeUrl));
      },
      (error)=>{
        console.error(error)
      }
    )
  }

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


  goToDetails(episodeUrl: string | undefined): void { 
    let url = episodeUrl?.split('/');
    const detailsId = url?.pop();
    const detailsName = url?.pop();
    this.router.navigate([`/${detailsName}s`, detailsId]);
  }

  showImage(characterUrl: string | undefined, characterName: string | undefined): void {
    this.selectedCharacterImage = characterUrl;
    this.selectedCharacterName = characterName;
  }

  hideImage(): void {
    this.selectedCharacterImage = undefined;
    this.selectedCharacterName = undefined;
  }

}

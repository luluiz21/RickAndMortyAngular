import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/core/services/character.service';
import { EpisodeService } from 'src/app/core/services/episode.service';
import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  character: Character | undefined;
  episodeNames: { 
    [url: string]: string | undefined,
    } = {};

  constructor(
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.getDetailsCharacter(this.route.snapshot.params["id"]);
    
  }

  getDetailsCharacter(id: number){
    this.characterService.getCharacter(id).subscribe(
      (data)=>{
        this.character = data;
        data?.episode.forEach((episodeUrl: string) => this.getEpisodeName(episodeUrl));
      },
      (error)=>{
        console.error(error)
      }
    )
  }

  getEpisodeName(episodeUrl: string): void {
    
    if (!this.episodeNames[episodeUrl]) {
      this.episodeService.getEpisodeWithUrl(episodeUrl).subscribe(
        (data) => {
          this.episodeNames[episodeUrl] = data.name;
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
  

   
}

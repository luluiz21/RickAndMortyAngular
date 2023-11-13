import { Component, OnInit } from '@angular/core';
import { EpisodeService } from 'src/app/core/services/episode.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  constructor(private episodeService: EpisodeService) { }

  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes(): void{
    this.episodeService.getEpisodes().subscribe(
      ((data) =>{
        console.log(data.results);
        
      }),
      ((error) =>{
        console.error(error);
      })
    )
  }

}

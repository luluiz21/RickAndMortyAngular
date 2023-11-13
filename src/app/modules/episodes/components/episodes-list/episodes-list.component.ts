import { Component, OnInit } from '@angular/core';
import { EpisodeService } from 'src/app/core/services/episode.service';
import { Episode } from 'src/app/shared/models/episode.model';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.css']
})
export class EpisodesListComponent implements OnInit {

  episodes: Episode[] = [];
  nextPage = 2;
  hasNextPage = true;
  episodeColumns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'air_date', title: 'Air Date'},
    { key: 'episode', title: "Episode"}
  ];

  constructor(private episodeService: EpisodeService) { }

  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes(): void {
    this.episodeService.getEpisodes().subscribe(
      ((data) => {
        this.episodes = data.results;
        console.log(this.episodes);
        
      }),
      (error) => console.error(error)
    );
  }

  loadMoreEpisodes():void {
    console.log('teste');
    if(this.hasNextPage){

      this.episodeService.getEpisodes(this.nextPage.toString()).subscribe(
        ((data) => {
          this.episodes.push(...data.results);
          console.log(this.episodes);
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

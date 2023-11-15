import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EpisodeService } from 'src/app/core/services/episode.service';
import { FilterService } from 'src/app/core/services/filter.service';
import { Episode } from 'src/app/shared/models/episode.model';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.css']
})
export class EpisodesListComponent implements OnInit, OnDestroy {

  @ViewChild('scrollContainer') private scrollContainer: ElementRef | undefined;

  private searchSubscription: Subscription | undefined;
  filterName: string = '';
  episodes: Episode[] = [];
  nextPage = 2;
  hasNextPage = true;
  episodeColumns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'air_date', title: 'Air Date'},
    { key: 'episode', title: "Episode"}
  ];

  constructor(
    private episodeService: EpisodeService,
    private filterService: FilterService
    ) { }

  ngOnInit() {
    /* this.loadEpisodes(); */
    this.searchSubscription = this.filterService.getSearchTerm().subscribe(term => {
      this.applyFilter(term);
    });
  }

  applyFilter(term: string) {
    
    this.episodeService.getEpisodes(undefined, term).subscribe(
      ((data) => {
        this.filterName = term;
        this.episodes = data.results;
        this.resetScroll();
        if(data.info.next !== null){
          this.nextPage = 2;
          this.hasNextPage = true;
        }
        console.log(this.episodes);
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

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

}

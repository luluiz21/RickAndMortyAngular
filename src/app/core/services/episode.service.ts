import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from 'src/app/config/api.config';
import { Episode } from 'src/app/shared/models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private apiUrl = `${API_BASE_URL}/episode`;

  constructor(private http: HttpClient) { }
  /* Chamada da api que retorna uma lista de Episodes */
  getEpisodes(page?: string, name?:string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page);
    }
    if(name){
      params = params.set('name', name);
    }
    return this.http.get(this.apiUrl, {params });
  }
  /* Chamada da api que retorna um Episode por ID */
  getEpisode(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  /* Chamada da api direto pela url que retorna na API do Rick And Morty */
  getEpisodeWithUrl(url: string): Observable<Episode>{
    return this.http.get<Episode>(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}

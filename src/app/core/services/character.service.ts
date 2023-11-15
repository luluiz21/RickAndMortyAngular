import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { API_BASE_URL } from 'src/app/config/api.config';
import { Observable, map } from 'rxjs';
import { Character } from 'src/app/shared/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = `${API_BASE_URL}/character`;

  constructor(private http: HttpClient) { }

  getCharacters(page?: string, name?:string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page);
    }
    if(name){
      params = params.set('name', name);
    }
    return this.http.get(this.apiUrl, {params });
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getCharacterWithUrl(url: string): Observable<Character>{
    return this.http.get<Character>(url).pipe(
      map((response: any) => {
        // Transformação, se necessário
        return response;
      })
    );
  }


}

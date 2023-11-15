import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = `${API_BASE_URL}/location`;

  constructor(private http: HttpClient) { }

  getLocations(page?: string, name?:string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page);
    }
    if(name){
      params = params.set('name', name);
    }
    return this.http.get(this.apiUrl, {params });
  }

  getLocation(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getLocationWithUrl(url: string): Observable<Location>{
    return this.http.get<Location>(url).pipe(
      map((response: any) => {
        // Transformação, se necessário
        return response;
      })
    );
  }
  

}

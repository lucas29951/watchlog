import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  private apiKey = '4a340c34';
  private url = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) { }

  searchMedia(query: string): Observable<any> {
    return this.http.get<any>(`${this.url}?apikey=${this.apiKey}&s=${query}`);
  }

  getMediaDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}?apikey=${this.apiKey}&i=${id}&plot=full`);
  }
}

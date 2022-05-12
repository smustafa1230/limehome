import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import {query} from '@angular/animations';
import {RESERVATION} from "../../interface/reservation"
@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  hotels: any[] = [];
  markerSelectedEvent: Subject<string> = new Subject<string>();
  // default location, intersection of equator and prime meridian
  private _currentLocation: [latitude: number, longitude: number] = [0, 0];

  get currentLocation(): [latitude: number, longitude: number] {
    return this._currentLocation;
  }
  set currentLocation(position: [latitude: number, longitude: number]) {
    this._currentLocation = position;
  }

  constructor(
    private _httpClient: HttpClient
  ) { }
  saveReservation(body: RESERVATION) {
    return this._httpClient.post(`${environment.baseUrl}users/reservation`, body);
  }
  queryLocation(query: string) {
    const [latitude, longitude] = this._currentLocation;
    const params = new HttpParams();
    params.append('at', `${latitude},${longitude}`);
    params.append('q', query);
    params.append('apiKey', environment.apiKey);
    return this._httpClient.get(`https://discover.search.hereapi.com/v1/discover?apiKey=${environment.apiKey}&at=${latitude},${longitude}&q=${query}`)
      .pipe(
        tap(
          ({ items }: any) => {
            this.hotels = items.map(
              (item: any) => {
                item.price = Math.round((Math.random() * 100) + 1);
                return item;
              }
            );
          }
        ),
        catchError(
          () => {
            this.hotels = [];
            return of([]);
          }
        )
      );
  }
}

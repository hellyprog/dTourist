import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionResponse } from '@core/models';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private appConfigService: AppConfigService,
    private http: HttpClient) { }

  getCityInfoByCoordinates(latitude: number, longitude: number): Observable<PositionResponse> {
    const url = this.appConfigService.positionStackAPI 
      + `?access_key=${this.appConfigService.positionStackKey}&query=${latitude},${longitude}`;
    return this.http.get<PositionResponse>(url);
  }
}

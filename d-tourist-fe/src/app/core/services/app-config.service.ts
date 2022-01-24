import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig: any;

  constructor(private http: HttpClient) { }

  async loadAppConfig() {
    const data = await firstValueFrom(this.http.get('/assets/config.json'));
    this.appConfig = data;
  }

  get positionStackAPI() {
    return this.appConfig.positionStackAPI;
  }

  get positionStackKey() {
    return this.appConfig.positionStackKey;
  }

  get customsContractAddress() {
    return this.appConfig.customsContractAddress;
  }

  get wsProvider() {
    return this.appConfig.wsProvider;
  }
}

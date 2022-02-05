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

  get locationIqAPI() {
    return this.appConfig.locationIqAPI;
  }

  get locationIqKey() {
    return this.appConfig.locationIqKey;
  }

  get customsContractAddress() {
    return this.appConfig.customsContractAddress;
  }

  get insuranceStoreContractAddress() {
    return this.appConfig.insuranceStoreContractAddress;
  }

  get wsProvider() {
    return this.appConfig.wsProvider;
  }
}

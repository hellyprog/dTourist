import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@core/models/app-config.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig!: AppConfig;

  constructor(private http: HttpClient) { }

  async loadAppConfig() {
    const data = await firstValueFrom<AppConfig>(this.http.get<AppConfig>('/assets/config.json'));
    this.appConfig = data;
  }

  get contract() {
    return this.appConfig.contract;
  }

  get locationApi() {
    return this.appConfig.locationApi;
  }

  get scanner() {
    return this.appConfig.scanner;
  }
}

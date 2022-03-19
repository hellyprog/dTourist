import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { City } from '@core/models';
import { AppConfigService, CustomsService, GeolocationService } from '@core/services';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-customs',
  templateUrl: './customs.component.html',
  styleUrls: ['./customs.component.scss']
})
export class CustomsComponent implements OnInit, OnDestroy {
  fromCity!: City;
  toCity!: City;
  scanSuccessfull = false;
  securityCheckSuccessful = false;
  securityCheckMessage!: string;
  securityCheckInProgress = true;

  constructor(
    private customsService: CustomsService,
    private geolocationService: GeolocationService,
    private spinner: NgxSpinnerService,
    private appConfigService: AppConfigService
  ) {
    this.getDepartureLocation();
  }

  ngOnInit(): void {
    this.customsService.subscribeToContractEvent("TravelerDataProcessed", this.handleProcessedDataResult.bind(this));
  }

  ngOnDestroy(): void {
    this.spinner.hide();
    this.customsService.unsubscribeFromContractEvent("TravelerDataProcessed", this.handleProcessedDataResult.bind(this));
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: any) {
    if (event.data.type === 'scan') {
      this.toCity = new City(event.data.destinationCountry, event.data.destinationCity);
      this.scanSuccessfull = true;
    }
  }

  getDepartureLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geolocationService.getCityInfoByCoordinates(position.coords.latitude, position.coords.longitude)
          .subscribe(response => {
            if (response.address) {
              const address = response.address;
              this.fromCity = new City(address.city, address.country);
            }
          });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  scanTicket() {
    window.open(
      this.appConfigService.scanner.url,
      this.appConfigService.scanner.windowName,
      `width=${this.appConfigService.scanner.windowWidth},height=${this.appConfigService.scanner.windowHeight}`);
  }

  async initiateSecurityCheck() {
    this.spinner.show();
    this.securityCheckInProgress = true;
    await this.customsService.crossBorder(this.fromCity, this.toCity);
  }

  handleProcessedDataResult(success: boolean, message: string) {
    this.spinner.hide();
    this.securityCheckSuccessful = success;
    this.securityCheckMessage = message;
    this.securityCheckInProgress = false;
  }
}

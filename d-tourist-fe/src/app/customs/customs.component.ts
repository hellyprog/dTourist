import { Component, OnInit } from '@angular/core';
import { City, ExecutionResult } from '@core/models';
import { CustomsService, GeolocationService } from '@core/services';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-customs',
  templateUrl: './customs.component.html',
  styleUrls: ['./customs.component.scss']
})
export class CustomsComponent implements OnInit {
  fromCity!: City;
  toCity!: City;
  scanSuccessfull = false;
  securityCheckSuccessful = false;
  securityCheckMessage!: string;
  securityCheckInProgress = true;

  constructor(
    private customsService: CustomsService,
    private geolocationService: GeolocationService,
    private spinner: NgxSpinnerService) {
    this.getDepartureLocation();
  }

  ngOnInit(): void {
  }

  getDepartureLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geolocationService.getCityInfoByCoordinates(position.coords.latitude, position.coords.longitude)
          .subscribe(response => {
            if (response.data && response.data.length > 0) {
              const position = response.data[0];
              this.fromCity = new City(position.region, position.country);
            }
          });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  scanTicket() {
    this.toCity = new City('Madrid', 'Spain');
    this.scanSuccessfull = true;
  }

  async initiateSecurityCheck() {
    this.spinner.show();
    this.securityCheckInProgress = true;
    await this.customsService.crossBorder(this.fromCity, this.toCity);

    this.customsService.contract.on("TravelerDataProcessed", this.handleProcessedDataResult.bind(this));
  }

  handleProcessedDataResult(success: boolean, message: string) {
    debugger;
    this.securityCheckSuccessful = success;
    this.securityCheckMessage = message;
    this.securityCheckInProgress = false;
    this.spinner.hide();
  }
}

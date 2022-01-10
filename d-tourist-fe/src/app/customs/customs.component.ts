import { Component, OnInit } from '@angular/core';
import { City } from '@core/models';
import { CustomsService, GeolocationService } from '@core/services';

@Component({
  selector: 'app-customs',
  templateUrl: './customs.component.html',
  styleUrls: ['./customs.component.scss']
})
export class CustomsComponent implements OnInit {
  fromCity!: City;
  toCity!: City;
  scanSuccessfull = false;
  securityCheckSuccessfull = false;

  constructor(private customsService: CustomsService, private geolocationService: GeolocationService) {
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
    this.toCity = new City('Sopot', 'Poland');
    this.scanSuccessfull = true;
  }

  async initiateSecurityCheck() {
    await this.customsService.crossBorder(this.fromCity, this.toCity);
    this.securityCheckSuccessfull = true;
  }
}

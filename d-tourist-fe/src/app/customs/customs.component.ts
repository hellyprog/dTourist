import { Component, OnInit } from '@angular/core';
import { City } from '@core/models';
import { CustomsService } from '@core/services';

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

  constructor(private customsService: CustomsService) { 
  }

  ngOnInit(): void {
  }

  scanTicket() {
    this.fromCity = new City('Lviv', 'Ukraine');
    this.toCity = new City('Sopot', 'Poland');
    this.scanSuccessfull = true;
  }

  async initiateSecurityCheck() {
    await this.customsService.crossBorder(this.fromCity, this.toCity);
    this.securityCheckSuccessfull = true;
  }
}

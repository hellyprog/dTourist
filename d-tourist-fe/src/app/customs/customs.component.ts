import { Component, OnInit } from '@angular/core';
import { City } from '../core';

@Component({
  selector: 'app-customs',
  templateUrl: './customs.component.html',
  styleUrls: ['./customs.component.scss']
})
export class CustomsComponent implements OnInit {
  fromCity!: City;
  toCity!: City;
  scanSuccessfull = false;

  constructor() { 
  }

  ngOnInit(): void {
  }

  scanTicket() {
    this.fromCity = new City('Lviv', 'Ukraine');
    this.toCity = new City('Berlin', 'Germany');
    this.scanSuccessfull = true;
  }
}

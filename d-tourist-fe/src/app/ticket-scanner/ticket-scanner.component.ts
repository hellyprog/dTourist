import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@core/services';

declare let window: any;

@Component({
  selector: 'app-ticket-scanner',
  templateUrl: './ticket-scanner.component.html',
  styleUrls: ['./ticket-scanner.component.scss']
})
export class TicketScannerComponent implements OnInit {
  destinationCountry!: string;
  destinationCity!: string;

  constructor(private appConfig: AppConfigService) { }

  ngOnInit(): void {
  }

  scanTicket() {
    if (this.destinationCountry && this.destinationCity) {

      const data = {
        type: 'scan',
        destinationCountry: this.destinationCountry,
        destinationCity: this.destinationCity
      };
  
      window.opener.postMessage(data, '*');
      window.close();
    }
  }
}

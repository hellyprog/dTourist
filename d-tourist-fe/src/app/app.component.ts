import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isExternalRoute = false;

  constructor(public router: Router) {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        const scannerPath = '/ticket-scanner';
        this.isExternalRoute = value.url === scannerPath || value.urlAfterRedirects === scannerPath;
      }
    });
  }
}

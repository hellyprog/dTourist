import { Component, HostBinding, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.transparent') isHomePage: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.isHomePage = value.url === '/home';
      }
  });
  }

  ngOnInit(): void {
  }

}

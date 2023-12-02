import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();

  isLoginPage : boolean = false;
  isBlankPage : boolean = false;
  
  constructor(private router:Router) { 
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url.endsWith('login') || event.url === '/login';
      }
      if (event instanceof NavigationEnd) {
        this.isBlankPage = event.url.endsWith('/') || event.url === '/login';
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url.endsWith('login') || event.url === '/login';
      }
      if (event instanceof NavigationEnd) {
        this.isBlankPage = event.url.endsWith('/') || event.url === '/login';
      }
    });
  
  }

}

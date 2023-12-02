import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-agent-nav',
  templateUrl: './agent-nav.component.html',
  styleUrls: ['./agent-nav.component.scss']
})
export class AgentNavComponent implements OnInit {

  isLoginPage:boolean=false;
  isBlankPage:boolean=false;

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

  ngOnInit(): void {
  }

}

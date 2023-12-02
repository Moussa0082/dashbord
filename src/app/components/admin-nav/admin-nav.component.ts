import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthentificationService } from 'app/service/authentification.service';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title?: string;
    icon?: string;
    class?: string;
}



export const ROUTES: RouteInfo[] = [

  { path: '/tableaudebord', title: 'Tableau de bord',  icon: 'fa-chart-line', class: '' },
  //   { path: '/enseignant', title: 'Enseignant',  icon:'fa-user-graduate', class: '' },
  //   { path: '/etudiant', title: 'Etudiant',  icon:'fa-users', class: '' },
  //   { path: '/admin', title: 'Admin',  icon:'fa-user-shield', class: '' },
  //   { path: '/alert-en', title: 'Alert',  icon:'fa-bell', class: '' },
  //   { path: '/abonnement', title: 'Abonnement',  icon:'fa-money', class: '' },

  {path: '/bank', title:'Banques', icon:'fa fa-home', class:''},
  {path: '/type-bank', title:'Types Banques', icon:'fa fa-list-ol'},
  {path : '/demandes-recu', title:'Demande reçues', icon:'fa fa-envelope-open-text'},
  {path : '/demandes-en-cours', title:'Demande en cours', icon:'fa fa-tasks'},
  {path : '/demandes-valide', title:'Demande validées', icon:'fa fa-check', class:''},
  {path:  '/demandes-rejete', title:'Demande réjetées', icon:'fa fa-close'},
  {path:'/demande-annule', title:'Demande Annulées', icon:'fa fa-window-close'},
  {path: '/enable-agents', title:'Agent active', icon:'fa fa-user'},
  {path: '/disable-agents', title:'Agent desactiver' , icon:'fas fa-user-times'},
  {path: '/groupes-cotisation', title:'Groupes cotisation',icon:'fa fa-money' },
  {path:'admins', title:'Liste Admins', icon:'fa fa-users'},

];


@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {


  isBlankPage: boolean = false;
  isLoginPage: boolean = false;
  user: any;

  constructor(private authService: AuthentificationService,
     private router:Router) { 

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

    
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  
  loadUser() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      this.user = {
        userType: userData.userType,
        userData: userData.userData
      };
    } else {
      console.error('Aucune information utilisateur trouvée dans le localStorage.');
    }
  }


}

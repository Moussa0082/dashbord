// import { Component, OnInit } from '@angular/core';
// import { AuthGuardService } from 'app/service/auth-guard.service';
// import { AuthentificationService } from 'app/service/authentification.service';

// declare const $: any;
// declare interface RouteInfo {
//     path: string;
//     title: string;
//     icon: string;
//     class: string;
// }
// export const ROUTES: RouteInfo[] = [

//   { path: '/tableaudebord', title: 'Tableau de bord',  icon: 'fa-chart-line', class: '' },
//     { path: '/enseignant', title: 'Enseignant',  icon:'fa-user-graduate', class: '' },
//     { path: '/etudiant', title: 'Etudiant',  icon:'fa-users', class: '' },
//     { path: '/admin', title: 'Admin',  icon:'fa-user-shield', class: '' },
//     { path: '/alert-en', title: 'Alert',  icon:'fa-bell', class: '' },
//     { path: '/abonnement', title: 'Abonnement',  icon:'fa-money', class: '' },

// ];

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.css']
// })
// export class SidebarComponent implements OnInit {
//   menuItems: any[];
  

//   constructor(private authService: AuthentificationService,
//     private authguardService: AuthGuardService) { 
    
//   }

//   ngOnInit() {
//     this.menuItems = ROUTES.filter(menuItem => menuItem);
    
//   }
//   isMobileMenu() {
//       if ($(window).width() > 991) {
//           return false;
//       }
//       return true;
//   };
//   deConnecter(){
//    this.authService.deconnecter();
//    this.authService.triggerUpdate();
   
//   }

// }







//mon side bar

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthGuardService } from 'app/service/auth-guard.service';
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
  {path:'admins', title:'Admin de la banque', icon:'fa fa-users'},

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  isBlankPage: boolean = false;
  isLoginPage: boolean = false;
  isAdminPage: boolean = false;
  isAgentPage:boolean = false;
  user: any;

  constructor(private authService: AuthentificationService,
    private authguardService: AuthGuardService, private router:Router) { 

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isLoginPage = event.url.endsWith('login') || event.url === '/login';
        }
        if (event instanceof NavigationEnd) {
          this.isBlankPage = event.url.endsWith('/') || event.url === '/login';
        }
        if (event instanceof NavigationEnd) {
          this.isAdminPage = event.url.endsWith('adminTableau') || event.url === '/adminTableau';
        }
        if (event instanceof NavigationEnd) {
          this.isAgentPage = event.url.endsWith('agentTableau') || event.url === '/agentTableau';
        }
      });
    
  }

  showMenuItem(menuItem: any): boolean {

  
    // Logique pour déterminer si afficher ou non l'élément du menu en fonction du type d'utilisateur
    if (this.isAdminPage) {
      
        return menuItem.path !== '/bank' && menuItem.path!=='/type-bank'; // Exemple : ne pas afficher l'élément du menu '/bank' pour les administrateurs
      // Ajoutez d'autres cas pour d'autres types d'utilisateurs si nécessaire
    
  }}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
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

  deConnecter(){
  //  this.authService.deconnecter();
  //  this.authService.triggerUpdate();
   
  }

}

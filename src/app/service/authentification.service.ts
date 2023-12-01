import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'app/model/admin';

import { Observable, Subject } from 'rxjs';
import { AdministrateurService } from './administrateur.service';
import { SuperAdminService } from './super-admin.service';
import { AgentService } from './agent.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  openSnackBar(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  
  private admin1 : Admin|undefined;
  public isAuth : boolean = false;

  private userData: any

  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();
   constructor(
    private route:Router,
    private adminService: AdministrateurService,
    private agentService: AgentService,
    private superAdminService: SuperAdminService
  ) {}
  
 
  
 
 

  login(email: string, motDePasse: string, userType: string): Observable<any> {
    switch (userType) {
      case 'Admin':
        return this.adminService.loginAdmin(email, motDePasse);
      case 'Agent':
        return this.agentService.loginAgent(email, motDePasse, userType);
      case 'SuperAdmin':
        return this.superAdminService.loginSuperAdmin(email, motDePasse);
      default:
        throw new Error('Type d\'utilisateur non pris en charge');
    }
  }

  // setUserInfo(response: any): void {
  //   if (response && response.userType) {
  //     switch (response.userType) {
  //       case 'Admin':
  //         this.adminService.setAdminConnect(response);
  //         break;
  //       case 'SuperAdmin':
  //         this.superAdminService.setSuperAdminConnect(response);
  //         break;
  //       case 'Agent':
  //         this.agentService.setAgentConnect(response);
  //         break;
  //       default:
  //         console.error('Type d\'utilisateur non pris en charge :', response.userType);
  //         break;
  //     }
  //   } else {
  //     console.error('Aucune information utilisateur trouvée dans la réponse.');
  //   }
  // }

    // Méthode pour récupérer les informations de l'utilisateur
    getLoggedInUserInfo(): any {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const userType = userData.userType;
      if (userType) {
        switch (userType) {
          case 'Admin':
            return this.adminService.getAdminConnect();
          case 'SuperAdmin':
            return this.superAdminService.getSuperAdminConnect();
          case 'Agent':
            return this.agentService.getAgentConnect();
          default:
            console.error('Type d\'utilisateur non pris en charge :', userData.userType);
            return null;
        }
      } else {
        console.error('Aucune information utilisateur trouvée dans le localStorage.');
        return null;
      }
    }


  triggerUpdate() {
    this.updateEvent.next();
  }
  setAdminConnect(admin : Admin) {
    this.admin1 = admin;
    this.isAuth = true;
  }
  getAdminConnect():Admin |undefined { 
    return this.admin1;
  }
 
  deconnecter(){
    console.log("je suis dans deconnecter");

    this.admin1=null;
    this.isAuth = false;
    localStorage.clear();
    this.route.navigate(['/login']);
    console.log("sortie deconnecter",localStorage.getItem("idAdministrateur"));

  }
  

}

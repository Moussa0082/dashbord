import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'app/model/admin';
import { Agent } from 'app/model/agent';
import { SuperAdmin } from 'app/model/super-admin';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {

  openSnackBar(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  
  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();
  
  private admin1 : Admin|undefined;
  public isAuthAd: boolean = false;
  
  
  
  private baseUrl = 'http://localhost:8080/admin'; // Remplacez l'URL par celle de votre contrôleur Spring Boot

  constructor(private http: HttpClient) { }

  triggerUpdate() {
    this.updateEvent.next();
  }

 

 

  addAdmin(admin: Admin, imageFile?: File | null): Observable<any> {

    const formData = new FormData();

    formData.append('admin', JSON.stringify(admin));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post<Admin>(`${this.baseUrl}/create`, formData);
  }


  
   loginAdmin(email: string, motDePasse: string): Observable<any> {
   const body = {
    email: email,
    motdepasse: motDePasse,
   };

   return this.http.get(`${this.baseUrl}/login?email=${email}&motDePasse=${motDePasse}`);
  }

  setAdminConnect(admin : Admin) {
    this.admin1 = admin;
    this.isAuthAd = true;
    localStorage.setItem('admin', this.admin1.toString());
  }
  getAdminConnect():Admin |undefined { 
    return this.admin1;
  }

  getAdminList():Observable<any> {
    return this.http.get("http://localhost:8080/admin/read");
  }

  // Méthode pour récupérer les informations de l'administrateur connecté

  modifyAdmin(adminData: any) {
    return this.http.put("http://localhost:8080/admin/update", adminData);
  }

  //Activer admin 
  enableAdmin(idAgent: number) {
    return this.http.put(`http://localhost:8080/admin/enable/${idAgent}`, {});
  }

  //Desactiver admin 
  disableAdmin(idAdmin: number) {
    return this.http.put(`http://localhost:8080/admin/disable/${idAdmin}`, {});
  }
  

}

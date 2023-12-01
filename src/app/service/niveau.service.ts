import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Niveaux } from 'app/model/niveaux';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {
  openSnackBar(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  
  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();
 
  private baseUrl = 'http://localhost:8080/niveau/'; // Remplacez l'URL par celle de votre contrôleur Spring Boot

  constructor(private http: HttpClient) { }

  triggerUpdate() {
    this.updateEvent.next();
  }
  addNiveau(niveauData: any) {
    return this.http.post("http://localhost:8080/niveau/add", niveauData);
  }

  
  getNiveauById(niveauId: number): Observable<Niveaux> {
    const url = `${this.baseUrl}read/${niveauId}`; // Remplacez avec votre URL d'API
    return this.http.get<Niveaux>(url);
  }

  getNiveauList():Observable<any> {
    return this.http.get("http://localhost:8080/niveau/list");
    // console.log(this.getAdminList());
  }

  // Méthode pour récupérer les informations de l'administrateur connecté



  modifyNiveau(niveauData: any) {
    return this.http.put("http://localhost:8080/niveau/modifier", niveauData);
  }

  
  // deleteAdmin(adminData: any) {
  //   return this.http.delete(this.baseUrl+'supprimer', { body: adminData });
  // }
  deleteNiveau(niveauData: any) {
    return this.http.delete("http://localhost:8080/niveau/supprimer", { body: niveauData, responseType: 'text' });
  }
  
}

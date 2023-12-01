import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnseigantService {
  openSnackBar(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();
  
  private baseUrl = 'http://localhost:8080/enseignant/'; // Remplacez l'URL par celle de votre contrôleur Spring Boot

  constructor(private http: HttpClient) { }
  triggerUpdate() {
    this.updateEvent.next();
  }

  getEnseignantList():Observable<any> {
    return this.http.get("http://localhost:8080/enseignant/read");
    // console.log(this.getAdminList());
  }

  // Méthode pour changer l'accès d'un enseignant
  changeAccess(idEnseignant: number) {
    return this.http.put(`${this.baseUrl}changeAccess/${idEnseignant}`, {});
  }
  

 
  deleteEnseignant(adminData: any) {
    return this.http.delete("http://localhost:8080/enseignant/supprimer", { body: adminData, responseType: 'text' });
  }
}

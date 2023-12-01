import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  openSnackBar(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  private updateEvent = new Subject<void>();
  update$ = this.updateEvent.asObservable();
  
  private baseUrl = 'http://localhost:8080/etudiant/'; // Remplacez l'URL par celle de votre contrôleur Spring Boot
  private baseUrlA = 'http://localhost:8080/abonnement'; // Remplacez l'URL par celle de votre contrôleur Spring Boot

  constructor(private http: HttpClient) { }
  triggerUpdate() {
    this.updateEvent.next();
  }

  // Ajoutez la méthode getAbonnements
  getAbonnements(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/abonnement/list');
  }

  getAbonnementsByEtudiant(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrlA}/list/${id}`);
  }

  estAbonne(idEtudiant: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}etudiants/abonnement/${idEtudiant}`);
  }

  getEtudiantList():Observable<any> {
    return this.http.get("http://localhost:8080/etudiant/list");
    // console.log(this.getAdminList());
  }
  // Méthode pour changer l'accès d'un enseignant
  // deleteAdmin(adminData: any) {
  //   return this.http.delete(this.baseUrl+'supprimer', { body: adminData });
  // }
  

  deleteEtudiant(adminData: any) {
    return this.http.delete("http://localhost:8080/etudiant/supprimer", { body: adminData, responseType: 'text' });
  }

}

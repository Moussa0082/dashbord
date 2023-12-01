import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filiere } from 'app/model/filiere.model';
import { Niveaux } from 'app/model/niveaux';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {
  openSnackBar(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  
  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();
 
  private baseUrl = 'http://localhost:8080/filiere'; // Remplacez l'URL par celle de votre contrôleur Spring Boot

  constructor(private http: HttpClient) { }
  triggerUpdate() {
    this.updateEvent.next();
  }

  // Ajouter une filière
  ajouterFiliere(filiere: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, filiere);
  }

  // Récupérer la liste des filières
  getAllFilieres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }

  // Récupérer la liste des filières par niveau
  getFilieresByNiveau(idNiveau: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/list/${idNiveau}`);
  }

  // Récupérer une filière par son ID
  getOneFiliere(idFiliere: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/read/${idFiliere}`);
  }

  // Modifier une filière
  modifierFiliere(filiere: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/modifier`, filiere);
  }

  // Supprimer une filière
  supprimerFiliere(filiere: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/supprimer`, { body: filiere });
  }

  
}

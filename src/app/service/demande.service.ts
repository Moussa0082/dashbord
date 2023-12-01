import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  
  private updateEvent = new Subject<void>();

  constructor(private http: HttpClient) { }

  getAllDemande(): Observable<any> {
    return this.http.get('http://localhost:8080/demandes/read');
  }
  
  getDetailDemande(id: number): Observable<any> {
    // Appel API pour récupérer les détails d'une demande spécifique
    return this.http.get<any>(`http://localhost:8080/demandes/read/${id}`);
  }

  getAgents(): Observable<any[]> {
    // Appel API pour récupérer la liste des agents
    return this.http.get<any[]>(`http://localhost:8080/agent/read`);
  }

  assignDemandeToAgent(demandeId: number, agentId: number): Observable<any> {
    // Appel API pour attribuer la demande à l'agent
    return this.http.put<any>(`http://localhost:8080/demandes/${demandeId}/assign/${agentId}`, {});
  }

  validateDemande(demandeId: number, agentId: number): Observable<any> {
    const url = `http://localhost:8080/demandes/valider/${demandeId}/${agentId}`;
    return this.http.put(url, {});
  }

  rejeterDemande(demandeId: number, agentId: number): Observable<any> {
    const url = `http://localhost:8080/demandes/rejeter/${demandeId}/${agentId}`;
    return this.http.put(url, {});
  }

  triggerUpdate() {
    this.updateEvent.next();
  }
   
}

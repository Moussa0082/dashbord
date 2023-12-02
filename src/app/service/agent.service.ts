import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from 'app/model/agent';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private baseUrl = 'http://localhost:8080/agent';
  
  private agent1:Agent|undefined;
  public isAuthAg:boolean = false;
   
  private updateEvent = new Subject<void>();

  constructor(private http: HttpClient) { }


  // addAgent(agent: Agent, imageFile?: File | null): Observable<any> {

  //   const formData = new FormData();

  //   formData.append('agent', JSON.stringify(agent));
  //   if (imageFile) {
  //     formData.append('image', imageFile);
  //   }

  //   return this.http.post<Agent>(`${this.baseUrl}/create`, formData);
  // }

  createAgent(agent: any, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('agent', JSON.stringify(agent));
    if (image) formData.append('image', image);
    

    return this.http.post(`http://localhost:8080/agent/create`, formData);
  }


  getAllAgent(): Observable<any> {
    return this.http.get('http://localhost:8080/agent/read');
  }


  //Activer agent 
  enableAgent(idAgent: number) {
    return this.http.put(`http://localhost:8080/agent/enable/${idAgent}`, {});
  }

  //Desactiver agent 
  disableAgent(idAgent: number) {
    return this.http.put(`http://localhost:8080/agent/disable/${idAgent}`, {});
  }

  loginAgent(email: string, motDePasse: string, userType: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('motDePasse', motDePasse)
      .set('userType', userType);
  
    return this.http.get<any>(`${this.baseUrl}/login`, { params }).pipe(
      tap(response => {
        // Stocker les informations de l'utilisateur dans le localStorage
        localStorage.setItem('userData', JSON.stringify(response));
      })
    );
  }
  // loginAgent(email: string, motDePasse: string): Observable<any> {
  //   const body = {
  //    email: email,
  //    motdepasse: motDePasse,
  //   };
 
  //   return this.http.get(`${this.baseUrl}/login?email=${email}&motDePasse=${motDePasse}`);
  //  }

  triggerUpdate() {
    this.updateEvent.next();
  }


  setAgentConnect(agent : Agent) {
    this.agent1 = agent;
    this.isAuthAg = true;
  }
  getAgentConnect():Agent |undefined { 
    return this.agent1;
  }



}

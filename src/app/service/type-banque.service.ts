import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeBanqueService {

  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();

  constructor(private http:HttpClient) { 
    
  }

  

  // triggerUpdate() {
  //   this.updateEvent.next();
  // }

  createTypeBanque(typeBanque: any, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('typeBanque', JSON.stringify(typeBanque));
    if (image) formData.append('image', image);
    

    return this.http.post(`http://localhost:8080/typeBanque/create`, formData);
  }

  getAllTypeBanque(): Observable<any> {
    return this.http.get('http://localhost:8080/typeBanque/read');
  }

  // Méthode pour récupérer les informations de l'administrateur connecté

  modifierTypeBanque(idTypeBanque:number, typeBanque: any, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('typeBanque', JSON.stringify(typeBanque));
    if (image) formData.append('image', image);
    

    return this.http.put(`http://localhost:8080/typeBanque/update/${idTypeBanque}`, formData);
  }

  deleteTypeBank(id: number) {
    return this.http.delete(`http://localhost:8080/typeBanque/delete/${id}`);
  } 


}

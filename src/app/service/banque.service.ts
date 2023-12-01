import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Banque } from 'app/model/banque';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {

  private baseUrl = 'http://localhost:8080/banque';

  constructor(private http:HttpClient) { }

  // addBank(bankData: any) {
  //   return this.http.post("http://localhost:8080/banque/create", bankData);
  // }
  addBank(banque: Banque, imageFile?: File | null): Observable<any> {

    const formData = new FormData();

    formData.append('banque', JSON.stringify(banque));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post<Banque>(`${this.baseUrl}/create`, formData);
  }

  getAllBanque(): Observable<any> {
    return this.http.get('http://localhost:8080/banque/read');
  }

  // Méthode pour récupérer les informations de l'administrateur connecté

  modifyBank(idBanque: number, banque: any, image?: File) {
    const formData = new FormData();

    formData.append('banque', JSON.stringify(banque));
    if (image) {
      formData.append('image', image);
    }

    return this.http.put<Banque>(`${this.baseUrl}/update/${idBanque}`, formData);
   }

  deleteBank(id: any) {
    return this.http.delete(`http://localhost:8080/banque/delete/${id}`);
  } 


}

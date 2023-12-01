import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuperAdmin } from 'app/model/super-admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private baseUrl = 'http://localhost:8080/superAdmin';

  private superAdmin1:SuperAdmin | undefined;
  private isAuthSa:boolean = false;
  
  constructor(private http:HttpClient) { }

 
  loginSuperAdmin(email: string, motDePasse: string): Observable<any> {
    const body = {
     email: email,
     motdepasse: motDePasse,
    };
 
    return this.http.get(`${this.baseUrl}/login?email=${email}&motDePasse=${motDePasse}`);
   }
 

    
  setSuperAdminConnect(superAdmin : SuperAdmin) {
    this.superAdmin1 = superAdmin;
    this.isAuthSa = true;
  }
  getSuperAdminConnect():SuperAdmin |undefined { 
    return this.superAdmin1;
  }

}

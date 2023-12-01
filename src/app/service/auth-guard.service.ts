import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  [x: string]: any;
  constructor(private authService: AuthentificationService,
    private router: Router){

  }

  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();

  canActivate(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(this.authService.isAuth) {
        return true;
      }else{
        return this.router.navigate(['/login']);
      }
  }
}

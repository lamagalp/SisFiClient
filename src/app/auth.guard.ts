import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AutenticacionService} from './login/services/autenticacion.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AutenticacionService, private _router: Router){}

  canActivate(): boolean{
    if(this._authService.loggedIn()){
      return true;
    } else{
      this._router.navigate(['/login/signin']);
      return false;
    }
  }

}

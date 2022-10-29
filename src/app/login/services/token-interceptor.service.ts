import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor( private _authService: AutenticacionService) { }

  intercept(request: any, next: any){
    const tokenizeRequest = request.clone({
      setHeaders:{
        Authorization: `Bearer ${this._authService.getToken()}`
      }
    })
    return next.handle(tokenizeRequest);
  }



}

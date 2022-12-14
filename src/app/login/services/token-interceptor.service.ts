import { Injectable } from '@angular/core';
import { HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor( private _authService: AutenticacionService) { }

  intercept(request: any, next: any){
    
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._authService.getToken()}`
    });
    const tokenizeRequest = request.clone({headers});
    
    return next.handle(tokenizeRequest);
  }



}

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  API_URI : string = environment.API_URL;
 
  constructor(private http:HttpClient) { }

  signIn(user:any):Observable<any>{
    return this.http.post<any>(this.API_URI + '/usuarios/signin', user);
  }

  logOut(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('idUser');
  }

  loggedIn(): boolean{
    return !!sessionStorage.getItem('token');
  }

  getToken(){
    //console.log(sessionStorage.getItem('token'));
    return sessionStorage.getItem('token');
  }

  getIdUser(){
    return sessionStorage.getItem('idUser');
  }


}

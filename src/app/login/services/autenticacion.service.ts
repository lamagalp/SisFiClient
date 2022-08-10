import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private API_URL = "http://localhost:3000/SisFi/api/usuarios/";
  //private token:string;

  constructor(private http:HttpClient) { }

  signIn(user:any):Observable<any>{
    return this.http.post<any>(this.API_URL + 'signin', user);
  }

  logOut(){
    sessionStorage.removeItem('token');
    console.log(sessionStorage.getItem('token'));
    sessionStorage.removeItem('idUser');
  }

  loggedIn(): boolean{
    return !!sessionStorage.getItem('token');
  }

  getToken(){
    console.log(sessionStorage.getItem('token'));
    return sessionStorage.getItem('token');
  }

  getIdUser(){
    return sessionStorage.getItem('idUser');
  }


}

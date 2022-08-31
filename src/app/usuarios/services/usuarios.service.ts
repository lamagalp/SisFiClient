import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = 'http://192.168.0.6:3000/SisFi/api';

  constructor(private http:HttpClient) { }

  getUsuarios(): Observable<any>{
    return this.http.get(`${this.API_URI}/usuarios`);
  }

  getUsuario(id: string|number): Observable<any>{
    return this.http.get<any>(`${this.API_URI}/usuarios/${id}`);
  }

  addUsuario(user: Usuario): Observable<any>{
    return this.http.post(`${this.API_URI}/usuarios`, user);
  }

  deleteUsuario(id: string|number): Observable<any>{
    return this.http.delete(`${this.API_URI}/usuarios/${id}`);
  }

  updateUsuario(id: string|number, user: Usuario): Observable<any>{
    return this.http.put(`${this.API_URI}/usuarios/${id}`, user);
  }

}

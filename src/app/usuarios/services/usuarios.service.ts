import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = environment.API_URL;

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

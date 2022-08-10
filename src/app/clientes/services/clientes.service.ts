import { Cliente } from '../models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  API_URI = 'http://localhost:3000/SisFi/api';

  constructor(private http:HttpClient) { }

  getClientes(): Observable<any>{
    return this.http.get(`${this.API_URI}/clientes`);
  }

  getCliente(id: string|number): Observable<any>{
    return this.http.get(`${this.API_URI}/clientes/${id}`);
  }

  addCliente(cliente: Cliente): Observable<any>{
    return this.http.post(`${this.API_URI}/clientes`, cliente);
  }

  deleteCliente(id: string|number): Observable<any>{
    return this.http.delete(`${this.API_URI}/clientes/${id}`);
  }

  updateCliente(id: string|number, cliente: Cliente): Observable<any>{
    return this.http.put(`${this.API_URI}/clientes/${id}`, cliente);
  }

}

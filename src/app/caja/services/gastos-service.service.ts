import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from '../models/gasto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  API_URI = environment.API_URL;

  constructor(private http:HttpClient) { }

  getGastos(): Observable<any>{
    return this.http.get(`${this.API_URI}/gastos`);
  }

  getGasto(id: string|number): Observable<any>{
    return this.http.get(`${this.API_URI}/gastos/${id}`);
  }

  addGasto(gasto: Gasto): Observable<any>{
    return this.http.post(`${this.API_URI}/gastos`, gasto);
  }

  updateGasto(id: string|number, gasto: Gasto): Observable<any>{
    return this.http.put(`${this.API_URI}/gastos/${id}`, gasto);
  }

}

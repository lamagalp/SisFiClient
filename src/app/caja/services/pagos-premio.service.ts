import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoPremio } from '../models/pagoPremio';

@Injectable({
  providedIn: 'root'
})
export class PagosPremioService {

  API_URI = 'http://localhost:3000/SisFi/api';

  constructor(private http:HttpClient) { }

  getPagosPremio(): Observable<any>{
    return this.http.get(`${this.API_URI}/pagosPremio`);
  }

  getPagoPremio(id: string|number): Observable<any>{
    return this.http.get(`${this.API_URI}/pagosPremio/${id}`);
  }

  addPagoPremio(pagoPremio: PagoPremio): Observable<any>{
    return this.http.post(`${this.API_URI}/pagosPremio`, pagoPremio);
  }

  updatePagoPremio(id: string|number, pagoPremio: PagoPremio): Observable<any>{
    return this.http.put(`${this.API_URI}/pagosPremio/${id}`, pagoPremio);
  }
}

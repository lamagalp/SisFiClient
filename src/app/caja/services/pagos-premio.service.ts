import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoPremio } from '../models/pagoPremio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosPremioService {

  API_URI = environment.API_URL;

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

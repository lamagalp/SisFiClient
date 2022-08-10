import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HojaCaja } from '../models/hojaCaja';

@Injectable({
  providedIn: 'root'
})
export class HojasCajaService {

  API_URI = 'http://localhost:3000/SisFi/api';

  constructor(private http:HttpClient) { }

  getHojasCaja(): Observable<any>{
    return this.http.get(`${this.API_URI}/hojas`);
  }

  getHojaCajaHoy(): Observable<any>{
    return this.http.get(`${this.API_URI}/hojas/get/hoy`);
  }

  getHojaCaja(id: string|number): Observable<any>{
    return this.http.get(`${this.API_URI}/hojas/${id}`);
  }

  addHojaCaja(hoja: HojaCaja): Observable<any>{
    return this.http.post(`${this.API_URI}/hojas`, hoja);
  }

  deleteHojaCaja(id: string|number): Observable<any>{
    return this.http.delete(`${this.API_URI}/hojas/${id}`);
  }

  updateHojaCaja(id: string|number, hoja: HojaCaja): Observable<any>{
    console.log(hoja);
    return this.http.put(`${this.API_URI}/hojas/${id}`, hoja);
  }
}

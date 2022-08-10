import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  API_URI = 'http://localhost:3000/SisFi/api';

  constructor(private http:HttpClient) { }

  getVentas(): Observable<any>{
    return this.http.get(`${this.API_URI}/ventas`);
  }

  getVenta(id: string|number): Observable<any>{
    return this.http.get(`${this.API_URI}/ventas/${id}`);
  }

  addVenta(venta: Venta): Observable<any>{
    return this.http.post(`${this.API_URI}/ventas`, venta);
  }

  updateVenta(id: string|number, venta: Venta): Observable<any>{
    return this.http.put(`${this.API_URI}/ventas/${id}`, venta);
  }

}

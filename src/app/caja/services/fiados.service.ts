import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fiado } from '../models/fiado';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiadosService {

  API_URI = environment.API_URL;

  constructor(private http:HttpClient) { }

  getFiados(): Observable<any>{
    return this.http.get(`${this.API_URI}/fiados`);
  }

  getFiado(id: string|number): Observable<any>{
    return this.http.get(`${this.API_URI}/fiados/${id}`);
  }

  addFiado(fiado: Fiado): Observable<any>{
    return this.http.post(`${this.API_URI}/fiados`, fiado);
  }

  updateFiado(id: string|number, fiado: Fiado): Observable<any>{
    return this.http.put(`${this.API_URI}/fiados/${id}`, fiado);
  }

}

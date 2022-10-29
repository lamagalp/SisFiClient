import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArqueosCajasService {

  API_URI = environment.API_URL;

  constructor(private http:HttpClient) { }

  getArqueoCaja(id: string|number): Observable<any>{
    return this.http.get(`${this.API_URI}/arqueos/${id}`);
  }

  addArqueoCaja(arqueo: any): Observable<any>{
    return this.http.post(`${this.API_URI}/arqueos`, arqueo);
  }

  updateArqueoCaja(id: number | undefined, arqueo: any): Observable<any>{
    //console.log(arqueo);
    return this.http.put(`${this.API_URI}/arqueos/${id}`, arqueo);
  }
}


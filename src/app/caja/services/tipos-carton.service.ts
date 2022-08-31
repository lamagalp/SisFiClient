import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCarton} from '../models/tipoCarton';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposCartonService {

  API_URI = environment.API_URL;

  constructor(private http:HttpClient) { }


  getTiposCarton(): Observable<any>{
    return this.http.get(`${this.API_URI}/tiposCarton`);
  }

  getTipoCarton(id: string|number): Observable<any>{
    return this.http.get(`${this.API_URI}/tiposCarton/${id}`);
  }

  addTipoCarton(tipo: TipoCarton): Observable<any>{
    return this.http.post(`${this.API_URI}/tiposCarton`, tipo);
  }

  updateTipoCarton(id: string|number, tipo: TipoCarton): Observable<any>{
    return this.http.put(`${this.API_URI}/tiposCarton/${id}`, tipo);
  }

}

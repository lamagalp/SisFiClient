import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule }from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AutenticacionService } from './autenticacion.service';

const mockBody = {"usuario":"ma","clave":"ma"};
const mockRta = {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdXN1YXJpbyI6eyJpZCI6MiwiYXBlbGxpZG8iOiJtYSIsIm5vbWJyZSI6Im1hIiwidGVsZWZvbm8iOiIiLCJsZWdham8iOiIiLCJ1c3VhcmlvIjoibWEiLCJjbGF2ZSI6Im1hIiwiaWRSb2wiOm51bGx9LCJfZmVjaGEiOiIyMDIyLTA5LTA1VDE3OjQwOjI4LjkwMFoiLCJpYXQiOjE2NjIzOTk2Mjh9.uww3vONw55SC3yDTXz6IzcOqYfAcKDRdqD7fO7z0zvA","idUser":2};
const mockError404 = new HttpErrorResponse(
  { "status": 404, "statusText": "Not Found", "error": { "text": "No se ha encontrado el usuario y/o contraseña." } 
}
);

describe('AutenticacionService', () => {
  let service: AutenticacionService;
  let httpClientSpy: { post : jasmine.Spy}; //espía el método post
 
 
  beforeEach(() => {
    //TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AutenticacionService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be signin', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(mockRta));    
     //debe ser un obsevable
     service.signIn(mockBody).subscribe({
      next:(res : any )=>{
        expect(res).toEqual(mockRta);
        done(); //finaliza la prueba
      }
     });
  });

  it('should be not signin', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(throwError(() => mockError404));    
     //debe ser un obsevable
     service.signIn(mockBody).subscribe({
      error:(error )=>{
        expect(error.status).toEqual(404);
        done(); //finaliza la prueba
      }
     });
  });
});



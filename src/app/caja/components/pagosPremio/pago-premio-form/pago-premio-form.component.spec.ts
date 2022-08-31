import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router } from 'express';
import { PagosPremioService } from 'src/app/caja/services/pagos-premio.service';
import { TiposCartonService } from 'src/app/caja/services/tipos-carton.service';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';

import { PagoPremioFormComponent } from './pago-premio-form.component';

describe('PagoPremioFormComponent', () => {
  let component: PagoPremioFormComponent;
  let fixture: ComponentFixture<PagoPremioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoPremioFormComponent ],
      imports:[RouterTestingModule, FormsModule, NgSelectModule, HttpClientModule],
      providers:[ClientesService, TiposCartonService, AutenticacionService, UsuariosService, PagosPremioService, HttpClient, HttpHandler]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoPremioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 
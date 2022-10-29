import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule }from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TiposCartonService } from 'src/app/caja/services/tipos-carton.service';
import { VentasService } from 'src/app/caja/services/ventas.service';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';

import { VentaFormComponent } from './venta-form.component';

describe('VentaFormComponent', () => {
  let component: VentaFormComponent;
  let fixture: ComponentFixture<VentaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaFormComponent ],   
      imports:[RouterTestingModule, FormsModule, NgSelectModule, HttpClientTestingModule],
      providers:[AutenticacionService, UsuariosService, VentasService, ClientesService, TiposCartonService, HttpClient, HttpHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule }from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { GastosService } from 'src/app/caja/services/gastos-service.service';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';

import { GastoFormComponent } from './gasto-form.component';

describe('GastoFormComponent', () => {
  let component: GastoFormComponent;
  let fixture: ComponentFixture<GastoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastoFormComponent ],
      imports:[FormsModule, NgSelectModule, HttpClientTestingModule],
      providers:[ClientesService, AutenticacionService, UsuariosService, GastosService, HttpClient, HttpHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

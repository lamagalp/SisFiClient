import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FiadosService } from 'src/app/caja/services/fiados.service';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';

import { FiadoFormComponent } from './fiado-form.component';

describe('FiadoFormComponent', () => {
  let component: FiadoFormComponent;
  let fixture: ComponentFixture<FiadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiadoFormComponent ],
      imports:[FormsModule, NgSelectModule, HttpClientModule],      
      providers:[ClientesService, AutenticacionService, UsuariosService ,HttpClient, FiadosService, HttpClient, HttpHandler],      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

  
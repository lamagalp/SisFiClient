import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule }from '@angular/common/http/testing';

import { ArqueoCajaComponent } from './arqueo-caja.component';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { ArqueosCajasService } from '../../services/arqueos-cajas.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('ArqueoCajaComponent', () => {
  let component: ArqueoCajaComponent;
  let fixture: ComponentFixture<ArqueoCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ ArqueoCajaComponent ],
      providers: [AutenticacionService, UsuariosService, ArqueosCajasService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArqueoCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

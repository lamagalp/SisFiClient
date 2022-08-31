import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HojasCajaService } from 'src/app/caja/services/hojas-caja.service';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';

import { HojaCajaFormComponent } from './hoja-caja-form.component';

describe('HojaCajaFormComponent', () => {
  let component: HojaCajaFormComponent;
  let fixture: ComponentFixture<HojaCajaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, FormsModule],
      providers:[HojasCajaService, AutenticacionService, UsuariosService, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            queryParamMap: {
              get(): number {
                return 10;
              }
            }
          }
        }
      }],
      declarations: [ HojaCajaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaCajaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

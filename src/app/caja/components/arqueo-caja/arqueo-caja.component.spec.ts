import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArqueoCajaComponent } from './arqueo-caja.component';

describe('ArqueoCajaComponent', () => {
  let component: ArqueoCajaComponent;
  let fixture: ComponentFixture<ArqueoCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArqueoCajaComponent ]
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

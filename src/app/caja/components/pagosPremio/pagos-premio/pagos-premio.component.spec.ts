import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosPremioComponent } from './pagos-premio.component';

describe('PagosPremioComponent', () => {
  let component: PagosPremioComponent;
  let fixture: ComponentFixture<PagosPremioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosPremioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosPremioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

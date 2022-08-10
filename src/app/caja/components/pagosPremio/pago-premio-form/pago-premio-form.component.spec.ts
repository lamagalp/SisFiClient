import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoPremioFormComponent } from './pago-premio-form.component';

describe('PagoPremioFormComponent', () => {
  let component: PagoPremioFormComponent;
  let fixture: ComponentFixture<PagoPremioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoPremioFormComponent ]
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

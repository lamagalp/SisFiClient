import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiadoFormComponent } from './fiado-form.component';

describe('FiadoFormComponent', () => {
  let component: FiadoFormComponent;
  let fixture: ComponentFixture<FiadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiadoFormComponent ]
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

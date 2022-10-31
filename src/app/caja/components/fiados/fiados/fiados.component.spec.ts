import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiadosComponent } from './fiados.component';

describe('FiadosComponent', () => {
  let component: FiadosComponent;
  let fixture: ComponentFixture<FiadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

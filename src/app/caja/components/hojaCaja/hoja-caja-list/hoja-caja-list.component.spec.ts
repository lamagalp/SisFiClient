import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule }from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaCajaListComponent } from './hoja-caja-list.component';

describe('HojaCajaListComponent', () => {
  let component: HojaCajaListComponent;
  let fixture: ComponentFixture<HojaCajaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[HttpClient, HttpHandler],
      declarations: [ HojaCajaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaCajaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

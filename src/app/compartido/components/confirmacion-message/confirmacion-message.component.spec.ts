import { HttpClientTestingModule }from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgSelectModule } from '@ng-select/ng-select';

import { ConfirmacionMessageComponent } from './confirmacion-message.component';

describe('ConfirmacionMessageComponent', () => {
  let component: ConfirmacionMessageComponent;
  let fixture: ComponentFixture<ConfirmacionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgSelectModule],
      declarations: [ ConfirmacionMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

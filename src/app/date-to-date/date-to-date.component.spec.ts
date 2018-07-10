import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateToDateComponent } from './date-to-date.component';

describe('DateToDateComponent', () => {
  let component: DateToDateComponent;
  let fixture: ComponentFixture<DateToDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateToDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateToDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

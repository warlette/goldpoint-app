import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepossessedComponent } from './repossessed.component';

describe('RepossessedComponent', () => {
  let component: RepossessedComponent;
  let fixture: ComponentFixture<RepossessedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepossessedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepossessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

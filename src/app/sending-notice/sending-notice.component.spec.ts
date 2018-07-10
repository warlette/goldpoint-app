import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingNoticeComponent } from './sending-notice.component';

describe('SendingNoticeComponent', () => {
  let component: SendingNoticeComponent;
  let fixture: ComponentFixture<SendingNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

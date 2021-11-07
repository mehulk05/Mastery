import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDonateComponent } from './view-donate.component';

describe('ViewDonateComponent', () => {
  let component: ViewDonateComponent;
  let fixture: ComponentFixture<ViewDonateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDonateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLiveEventsComponent } from './add-edit-live-events.component';

describe('AddEditLiveEventsComponent', () => {
  let component: AddEditLiveEventsComponent;
  let fixture: ComponentFixture<AddEditLiveEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLiveEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLiveEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

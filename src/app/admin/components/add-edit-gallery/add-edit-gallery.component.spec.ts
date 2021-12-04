import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGalleryComponent } from './add-edit-gallery.component';

describe('AddEditGalleryComponent', () => {
  let component: AddEditGalleryComponent;
  let fixture: ComponentFixture<AddEditGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

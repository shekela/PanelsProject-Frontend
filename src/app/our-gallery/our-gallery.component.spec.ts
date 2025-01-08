import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurGalleryComponent } from './our-gallery.component';

describe('OurGalleryComponent', () => {
  let component: OurGalleryComponent;
  let fixture: ComponentFixture<OurGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurGalleryComponent]
    });
    fixture = TestBed.createComponent(OurGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

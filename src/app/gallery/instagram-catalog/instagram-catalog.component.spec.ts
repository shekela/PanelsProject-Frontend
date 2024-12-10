import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramCatalogComponent } from './instagram-catalog.component';

describe('InstagramCatalogComponent', () => {
  let component: InstagramCatalogComponent;
  let fixture: ComponentFixture<InstagramCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstagramCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstagramCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

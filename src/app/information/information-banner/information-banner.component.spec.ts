import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationBannerComponent } from './information-banner.component';

describe('InformationBannerComponent', () => {
  let component: InformationBannerComponent;
  let fixture: ComponentFixture<InformationBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

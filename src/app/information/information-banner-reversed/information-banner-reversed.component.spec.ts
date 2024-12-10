import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationBannerReversedComponent } from './information-banner-reversed.component';

describe('InformationBannerReversedComponent', () => {
  let component: InformationBannerReversedComponent;
  let fixture: ComponentFixture<InformationBannerReversedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationBannerReversedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationBannerReversedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

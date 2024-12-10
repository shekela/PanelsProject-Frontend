import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceComperatorComponent } from './voice-comperator.component';

describe('VoiceComperatorComponent', () => {
  let component: VoiceComperatorComponent;
  let fixture: ComponentFixture<VoiceComperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceComperatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceComperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { VoiceComperatorData } from '../DUMMY_DATA/VOICE-COMPERATOR-DATA/eng';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';
import { VoiceCompoeratorInterface } from '../models/voice-comperator-model';
import { SeparationService } from '../services/separation.service';

@Component({
  selector: 'app-voice-comperator',
  templateUrl: './voice-comperator.component.html',
  styleUrls: ['./voice-comperator.component.css']
})
export class VoiceComperatorComponent {

  constructor(private languageService: LanguageService, private separationService: SeparationService ) {}
  

  voiceComperatorData!: VoiceCompoeratorInterface;
  private subscription: Subscription | null = null;


  isVoiceTwoSelected = false; // Toggle between voices
  isPlaying = false; // Track playback status
  progress = 0; // Playback progress percentage (0 to 100)
  currentTime = 0; // Current playback time to resume from

  voice1Path!: string;
  voice2Path!: string;

  audio = new Audio();

  ngOnInit() {
    this.audio.addEventListener('timeupdate', () => {
      this.progress = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentTime = this.audio.currentTime; 
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.progress = 0;
      this.currentTime = 0; 
    });

    this.subscription = this.languageService.language$.subscribe((language) => {
      this.voiceComperatorData =
        this.separationService.translations.voiceComperator[language] ||
        this.separationService.translations.voiceComperator['GEO'];
        this.voice1Path = this.voiceComperatorData.voiceWOAcupanel;
        this.voice2Path = this.voiceComperatorData.voiceAcupanel;
    });
  
    this.subscription.add(
      this.separationService.translations$.subscribe(() => {
        const currentLanguage = this.languageService.getCurrentLanguage();
        this.voiceComperatorData =
          this.separationService.translations.voiceComperator[currentLanguage] ||
          this.separationService.translations.mainProducts['GEO'];
          this.voice1Path = this.voiceComperatorData.voiceWOAcupanel;
          this.voice2Path = this.voiceComperatorData.voiceAcupanel;
      })
    );
  }
   

  onVoiceToggleChange() {
    if (this.isPlaying) {
      this.audio.src = this.isVoiceTwoSelected ? this.voice2Path : this.voice1Path;
      this.audio.currentTime = this.currentTime; 
      this.audio.load();
      this.audio.play();
    }
  }

  // Play/pause logic when the play button is clicked
  togglePlayPause() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
    
      this.audio.src = this.isVoiceTwoSelected ? this.voice2Path : this.voice1Path;
      this.audio.currentTime = this.currentTime; 
      this.audio.load();
      this.audio.play();
      this.isPlaying = true;
    }
  }
}

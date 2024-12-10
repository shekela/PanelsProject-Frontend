import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-voice-comperator',
  templateUrl: './voice-comperator.component.html',
  styleUrls: ['./voice-comperator.component.css']
})
export class VoiceComperatorComponent {

  isVoiceTwoSelected = false; // Toggle between voices
  isPlaying = false; // Track playback status
  progress = 0; // Playback progress percentage (0 to 100)
  currentTime = 0; // Current playback time to resume from

  voice1Path = 'https://woodupp.com/wp-content/uploads/2023/08/Bad-acoustics-audio.wav';
  voice2Path = 'https://woodupp.com/wp-content/uploads/2023/08/Great-acoustics-audio.wav';

  audio = new Audio();

  ngOnInit() {
    // Update progress during playback
    this.audio.addEventListener('timeupdate', () => {
      this.progress = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentTime = this.audio.currentTime; // Keep track of the current time
    });

    // Reset play button and progress when audio ends
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.progress = 0;
      this.currentTime = 0; // Reset current time on end
    });
  }

  // Handle voice switching when the toggle is changed
  onVoiceToggleChange() {
    if (this.isPlaying) {
      // If audio is playing, switch to the new voice immediately, continuing from the same position
      this.audio.src = this.isVoiceTwoSelected ? this.voice2Path : this.voice1Path;
      this.audio.currentTime = this.currentTime; // Continue from the current time
      this.audio.load();
      this.audio.play();
    }
  }

  // Play/pause logic when the play button is clicked
  togglePlayPause() {
    if (this.isPlaying) {
      // Pause the audio
      this.audio.pause();
      this.isPlaying = false;
    } else {
      // Switch to the selected voice and start from the beginning or the current time
      this.audio.src = this.isVoiceTwoSelected ? this.voice2Path : this.voice1Path;
      this.audio.currentTime = this.currentTime; // Start from the current time or the beginning
      this.audio.load();
      this.audio.play();
      this.isPlaying = true;
    }
  }
}

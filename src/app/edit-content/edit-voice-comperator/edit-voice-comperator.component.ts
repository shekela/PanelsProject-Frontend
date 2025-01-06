import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { VoiceComperator } from 'src/app/services/requests.service';
import { SeparationService } from 'src/app/services/separation.service';

@Component({
  selector: 'app-edit-voice-comperator',
  templateUrl: './edit-voice-comperator.component.html',
  styleUrls: ['./edit-voice-comperator.component.css']
})
export class EditVoiceComperatorComponent {
  voices: VoiceComperator[] = [];
  currentVoice: VoiceComperator = { id: 0, voiceAcupanel: '', voiceWOAcupanel: '' };
  isVoicePopupOpen = false;
  isDeletePopupOpen = false;
  editMode = false;
  voiceToDeleteId: number | null = null;
  selectedAcupanelFile: File | null = null;
  selectedWOAcupanelFile: File | null = null;

  constructor(private http: HttpClient, private languageService: LanguageService, private separationService: SeparationService) {}

  ngOnInit(): void {
    this.loadVoices();
  }

  loadVoices(): void {
    this.http.get<VoiceComperator[]>('https://localhost:7001/api/VoiceComperator/get-VoiceExamples')
      .subscribe(data => {
        this.voices = data.map(voice => ({
          ...voice,
          voiceAcupanel: `https://localhost:7001${voice.voiceAcupanel}`,
          voiceWOAcupanel: `https://localhost:7001${voice.voiceWOAcupanel}`,
        }));
      });
  }

  openAddVoicePopup(): void {
    this.isVoicePopupOpen = true;
    this.editMode = false;
    this.currentVoice = { id: 0, voiceAcupanel: '', voiceWOAcupanel: '' };
  }

  openEditVoicePopup(voice: VoiceComperator): void {
    this.isVoicePopupOpen = true;
    this.editMode = true;
    this.currentVoice = { ...voice };
  }

  saveVoice(): void {
    const formData = new FormData();
    formData.append('voiceAcupanel', this.currentVoice.voiceAcupanel);
    formData.append('voiceWOAcupanel', this.currentVoice.voiceWOAcupanel);

    if (this.selectedAcupanelFile) {
      formData.append('voiceAcupanelFile', this.selectedAcupanelFile);
    }
    if (this.selectedWOAcupanelFile) {
      formData.append('voiceWOAcupanelFile', this.selectedWOAcupanelFile);
    }

    if (this.editMode) {
      this.http.put(`https://localhost:7001/api/VoiceComperator/update-voice/${this.currentVoice.id}`, formData)
        .subscribe(() => {
          this.loadVoices();
          this.closeVoicePopup();
        });
    } else {
      this.http.post('https://localhost:7001/api/VoiceComperator/AddVoices', formData)
        .subscribe(() => {
          this.loadVoices();
          this.closeVoicePopup();
        });
    }
  }

  onVoiceAcupanelFileChange(event: any): void {
    this.selectedAcupanelFile = event.target.files[0];
  }

  onVoiceWOAcupanelFileChange(event: any): void {
    this.selectedWOAcupanelFile = event.target.files[0];
  }

  closeVoicePopup(): void {
    this.isVoicePopupOpen = false;
  }

  openDeleteConfirmation(id: number): void {
    this.isDeletePopupOpen = true;
    this.voiceToDeleteId = id;
  }

  deleteVoice(): void {
    if (this.voiceToDeleteId !== null) {
      this.http.delete(`https://localhost:7001/api/VoiceComperator/delete-voice/${this.voiceToDeleteId}`)
        .subscribe(() => {
          this.loadVoices();
          this.closeDeletePopup();
        });
    }
  }

  closeDeletePopup(): void {
    this.isDeletePopupOpen = false;
  }

  private refreshTranslations() {
    const currentLanguage = this.languageService.getCurrentLanguage();
    this.separationService.fetchVoiceComperator(currentLanguage);
  }
}

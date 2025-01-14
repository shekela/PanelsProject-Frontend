import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { VoiceComperatorDto } from 'src/app/DTOS/VoiceComperatorDto'; 
import { SeparationService } from 'src/app/services/separation.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-voice-comperator',
  templateUrl: './edit-voice-comperator.component.html',
  styleUrls: ['./edit-voice-comperator.component.css']
})
export class EditVoiceComperatorComponent {
  voices: VoiceComperatorDto[] = [];
  currentVoice: VoiceComperatorDto = { id: 0, voiceAcupanel: '', voiceWOAcupanel: '' };
  isVoicePopupOpen = false;
  isDeletePopupOpen = false;
  editMode = false;
  voiceToDeleteId: number | null = null;
  selectedAcupanelFile: File | null = null;
  selectedWOAcupanelFile: File | null = null;

  constructor(private http: HttpClient, private languageService: LanguageService, private separationService: SeparationService, private requestService: RequestsService) {}

  ngOnInit(): void {
    this.loadVoices();
  }

  loadVoices(): void {
    this.requestService.getVoiceComperator()
      .subscribe(data => {
        this.voices = data;
      });
  }

  openAddVoicePopup(): void {
    this.isVoicePopupOpen = true;
    this.editMode = false;
    this.currentVoice = { id: 0, voiceAcupanel: '', voiceWOAcupanel: '' };
  }

  openEditVoicePopup(voice: VoiceComperatorDto): void {
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
      this.requestService.updateVoice(this.currentVoice.id, formData)
        .subscribe(() => {
          this.loadVoices();
          this.closeVoicePopup();
        });
    } else {
      this.requestService.addVoice(formData)
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
      this.requestService.deleteVoice(this.voiceToDeleteId)
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

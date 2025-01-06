import { Component, Renderer2 } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { RequestsService } from 'src/app/services/requests.service';
import { SeparationService } from 'src/app/services/separation.service';

export interface VideoCatalogDto {
  TitleEn: string;
  TitleRu: string;
  TitleKa: string;
  DescriptionEn: string;
  DescriptionRu: string;
  DescriptionKa: string;
  ButtonTextEn: string;
  ButtonTextRu: string;
  ButtonTextKa: string;
  BackgroundUrl: string;
}

@Component({
  selector: 'app-edit-video-catalog',
  templateUrl: './edit-video-catalog.component.html',
  styleUrls: ['./edit-video-catalog.component.css']
})
export class EditVideoCatalogComponent {
  isPopupOpen = false;
  currentField = '';
  selectedFile: File | undefined;

  videoCatalog: any = {
    TitleEn: '',
    TitleRu: '',
    TitleKa: '',
    DescriptionEn: '',
    DescriptionRu: '',
    DescriptionKa: '',
    ButtonTextEn: '',
    ButtonTextRu: '',
    ButtonTextKa: '',
    BackgroundUrl: ''
  };

  constructor(
    private renderer: Renderer2, 
    private requestService: RequestsService,
    private separationService: SeparationService,
    private languageService: LanguageService
  ) {}

  openPopup(field: string) {
    this.renderer.addClass(document.body, 'no-scroll');
    this.currentField = field;
    this.isPopupOpen = true;
  }

  closePopup() {
    this.renderer.removeClass(document.body, 'no-scroll');
    this.isPopupOpen = false;
    this.currentField = '';
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file || undefined;
  }

  submitPopup() {
    const formData = new FormData();
    if (this.currentField === 'Background Url' && this.selectedFile) {
      formData.append('backgroundFile', this.selectedFile, this.selectedFile.name);
    }
    const payload = this.createPayload();
    this.requestService.submitVideoCatalog(payload, this.selectedFile).subscribe({
      next: () => {
        this.refreshTranslations();
        this.closePopup();
      },
      error: (err) => {
        console.error('Error updating video catalog:', err);
      }
    });
  }

  private createPayload() {
    const payload: any = {};
    if (this.currentField === 'Title') {
      payload.TitleEn = this.videoCatalog.TitleEn;
      payload.TitleRu = this.videoCatalog.TitleRu;
      payload.TitleKa = this.videoCatalog.TitleKa;
    } else if (this.currentField === 'Description') {
      payload.DescriptionEn = this.videoCatalog.DescriptionEn;
      payload.DescriptionRu = this.videoCatalog.DescriptionRu;
      payload.DescriptionKa = this.videoCatalog.DescriptionKa;
    } else if (this.currentField === 'Button Text') {
      payload.ButtonTextEn = this.videoCatalog.ButtonTextEn;
      payload.ButtonTextRu = this.videoCatalog.ButtonTextRu;
      payload.ButtonTextKa = this.videoCatalog.ButtonTextKa;
    } else if (this.currentField === 'Background Url') {
      payload.BackgroundUrl = this.videoCatalog.BackgroundUrl;
    }
    return payload;
  }

  private refreshTranslations() {
    const currentLanguage = this.languageService.getCurrentLanguage();
    this.separationService.fetchVideoCatalog(currentLanguage);
  }
}

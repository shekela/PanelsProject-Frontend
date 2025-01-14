import { Component, Renderer2 } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { RequestsService } from 'src/app/services/requests.service';
import { SeparationService } from 'src/app/services/separation.service';

@Component({
  selector: 'app-edit-marketing-header',
  templateUrl: './edit-marketing-header.component.html',
  styleUrls: ['./edit-marketing-header.component.css']
})
export class EditMarketingHeaderComponent {
    contentView: string = 'Full Page';
  
    isPopupOpen = false;
    currentField = '';
  
    banner: any = {
      TitleEn: '',
      AimEn: '',
      DescriptionEn: '',
      TitleRu: '',
      AimRu: '',
      DescriptionRu: '',
      TitleKa: '',
      AimKa: '',
      DescriptionKa: '',
      ImgUrl: ''
    };

    selectedFile: File | undefined;

    // Modify the `onFileSelected` to assign `undefined` if no file is selected
    onFileSelected(event: any): void {
      const file = event.target.files[0];
      // Assign the selected file, or undefined if no file is selected
      this.selectedFile = file || undefined;
    }
  
    
  constructor(
      private renderer: Renderer2, 
      private requestService: RequestsService,
      private languageService: LanguageService, 
      private separationService: SeparationService,) {}
      

  openPopup(field: string) {
    this.renderer.addClass(document.body, 'no-scroll');
    this.currentField = field;
    this.isPopupOpen = true;
  }

  // Close the popup
  closePopup() {
    this.renderer.removeClass(document.body, 'no-scroll');
    this.isPopupOpen = false;
    this.currentField = '';
  }

  submitPopup() {
    const formData = new FormData();

    if (this.currentField === 'Background Url' && this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    const payload = this.createPayload();
    this.requestService.submitMarketingBanner(payload, this.selectedFile).subscribe({
      next: () => {
        this.refreshTranslations();
        this.closePopup();
      },
      error: (err) => {
        console.error('Error updating marketing banner:', err);
      }
    });
  }
  
  private createPayload() {
    const payload: any = {};
    if (this.currentField === 'Title') {
      payload.TitleEn = this.banner.TitleEn;
      payload.TitleRu = this.banner.TitleRu;
      payload.TitleKa = this.banner.TitleKa;
    } else if (this.currentField === 'Aim') {
      payload.AimEn = this.banner.AimEn;
      payload.AimRu = this.banner.AimRu;
      payload.AimKa = this.banner.AimKa;
    } else if (this.currentField === 'Description') {
      payload.DescriptionEn = this.banner.DescriptionEn;
      payload.DescriptionRu = this.banner.DescriptionRu;
      payload.DescriptionKa = this.banner.DescriptionKa;
    } else if (this.currentField === 'Background Url') {
      payload.ImgUrl = this.banner.ImgUrl;
    }
    return payload;
  }

  private refreshTranslations() {
    const currentLanguage = this.languageService.getCurrentLanguage();
    this.separationService.fetchMarketingBanners(currentLanguage);
  }
}

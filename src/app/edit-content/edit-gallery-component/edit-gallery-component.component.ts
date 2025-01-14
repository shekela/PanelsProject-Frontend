import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainProductSectionsDto } from 'src/app/DTOS/mainProductSectionsDto';
import { GalleryComponentTextsInterface } from 'src/app/models/gallery-component-texts.model';
import { GalleryObjectModel } from 'src/app/models/gallery-objects.model';
import { LanguageService } from 'src/app/services/language.service';
import { RequestsService } from 'src/app/services/requests.service';
import { SeparationService } from 'src/app/services/separation.service';

@Component({
  selector: 'app-edit-gallery-component',
  templateUrl: './edit-gallery-component.component.html',
  styleUrls: ['./edit-gallery-component.component.css']
})
export class EditGalleryComponentComponent {
  @ViewChild('mainVideo', { static: false }) mainVideoElement!: ElementRef<HTMLVideoElement>;

  isGalleryPicturesPopupOpen: boolean = false;
  isGalleryTextsPopupOpen: boolean = false;

  isDeleteConfirmOpen: boolean = false;
  pictureToDeleteId: number | null = null;

  galleryPictures: any[] = [];
  
  isPopupOpen: boolean = false; // Control visibility of the popup for adding a product
  newProduct: any = {}; // Object to hold the new product data
  selectedFile: File | null = null;

  newPicture: GalleryPictures = new GalleryPictures();
  GalleryTexts!: mainProductSectionsDto[];

  constructor(private fb: FormBuilder, private http: HttpClient, private languageService: LanguageService, private separationService: SeparationService, private reuqestService: RequestsService) {
    
  }

  ngOnInit(): void {
    this.loadGalleryTexts();
    this.loadGalleryPictures();
  }

  // Open the delete confirmation modal
  openDeleteConfirm(pictureId: number): void {
    this.isDeleteConfirmOpen = true;
    this.pictureToDeleteId = pictureId;
  }

  // Close the delete confirmation modal without deleting
  closeDeleteConfirm(): void {
    this.isDeleteConfirmOpen = false;
    this.pictureToDeleteId = null;
  }

  // Delete the selected picture
  deletePicture(): void {
    if (this.pictureToDeleteId !== null) {
      this.reuqestService.deleteGalleryPicture(this.pictureToDeleteId)
        .subscribe(
          (response) => {
            console.log('Picture deleted successfully:', response);
            this.galleryPictures = this.galleryPictures.filter(picture => picture.id !== this.pictureToDeleteId);
            this.closeDeleteConfirm(); 
          },
          (error) => {
            console.error('Error deleting picture:', error);
            alert('There was an error deleting the picture.');
          }
        );
    }
  }

  loadGalleryPictures(): void {
    this.reuqestService.getGalleryPictures()
      .subscribe(
        (response) => {
          this.galleryPictures = response;
        },
        (error) => {
          console.error('Error loading gallery pictures:', error);
        }
      );
  }

  loadGalleryTexts(): void{
    this.reuqestService.getGalleryTexts()
      .subscribe(
        (response) => {
          this.GalleryTexts = response;
          console.log(this.GalleryTexts);
        }
      )
  }
 
  
  openGalleryPicturesPopup() {
      this.isGalleryPicturesPopupOpen = true;
  }

  closeGalleryPicturesPopup() {
      this.isGalleryPicturesPopupOpen = false;
  }

  openGalleryTextsPopup() {
      this.isGalleryTextsPopupOpen = true;
  }

  closeGalleryTextsPopup() {
      this.isGalleryTextsPopupOpen = false;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  addOrUpdatePicture(): void {
    if (!this.newPicture.mediaType || !this.newPicture.url || !this.selectedFile) {
      alert('All fields are required, including selecting a background image!');
      return;
    }

    const formData = new FormData();
    // Append media type and URL
    formData.append('mediaType', this.newPicture.mediaType);
    formData.append('url', this.newPicture.url);

    // Append file only if it's selected
    if (this.selectedFile) {
        formData.append('backgroundImage', this.selectedFile, this.selectedFile.name);
    }

    this.reuqestService.addGalleryPicture(formData)
      .subscribe(
        (response) => {
          console.log('Picture added/updated successfully:', response);
          this.loadGalleryPictures();
          this.closeGalleryPicturesPopup();
        },
        (error) => {
          console.error('Error adding/updating picture:', error);
          alert('There was an error saving the picture.');
        }
      );
}

  // Update section texts
  updateGalleryTexts(): void {
    this.reuqestService.updateGalleryTexts(this.GalleryTexts[0])
      .subscribe(
        (response) => {
          console.log('Section texts updated successfully:', response);
          this.closeGalleryTextsPopup();
          this.refreshTranslations()
        },
        (error) => {
          console.error('Error updating section texts:', error);
          alert('There was an error updating the section texts.');
        }
      );
  }

  private refreshTranslations() {
    const currentLanguage = this.languageService.getCurrentLanguage();
    this.separationService.fetchGalleryComponentTexts(currentLanguage);
  }
  ngAfterViewChecked(): void {
    this.applyVideoSettings(this.mainVideoElement);
  }

  private applyVideoSettings(videoElement: ElementRef<HTMLVideoElement> | undefined) {
    if (videoElement) {
      const video = videoElement.nativeElement;
      video.muted = true; // Enable sound
      video.volume = 0; // Set to full volume
      console.log('Applied settings for video:', video.src);
    }
  }
}

class GalleryPictures {
  id: number = 0;
  mediaType: string = '';
  picture: string = '';
  url: string = '';
}



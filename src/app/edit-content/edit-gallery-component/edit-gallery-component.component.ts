import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryComponentTextsInterface } from 'src/app/models/gallery-component-texts.model';
import { GalleryObjectModel } from 'src/app/models/gallery-objects.model';
import { LanguageService } from 'src/app/services/language.service';
import { SeparationService } from 'src/app/services/separation.service';

@Component({
  selector: 'app-edit-gallery-component',
  templateUrl: './edit-gallery-component.component.html',
  styleUrls: ['./edit-gallery-component.component.css']
})
export class EditGalleryComponentComponent {

  isGalleryPicturesPopupOpen: boolean = false;
  isGalleryTextsPopupOpen: boolean = false;

  isDeleteConfirmOpen: boolean = false;
  pictureToDeleteId: number | null = null;

  galleryPictures: any[] = [];
  
  isPopupOpen: boolean = false; // Control visibility of the popup for adding a product
  newProduct: any = {}; // Object to hold the new product data
  selectedFile: File | null = null;

  newPicture: GalleryPictures = new GalleryPictures();
  sectionTexts: GallerySectionTexts = new GallerySectionTexts();

  constructor(private fb: FormBuilder, private http: HttpClient, private languageService: LanguageService, private separationService: SeparationService) {
    
  }

  ngOnInit(): void {
    // Load gallery pictures here
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
      this.http.delete(`https://localhost:7001/api/Gallery/delete-picture/${this.pictureToDeleteId}`)
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
    this.http.get<GalleryObjectModel[]>('https://localhost:7001/api/Gallery/get-gallery')
      .subscribe(
        (response) => {
          this.galleryPictures = response; // Assign the response to the galleryPictures array
        },
        (error) => {
          console.error('Error loading gallery pictures:', error);
        }
      );
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

    // Call the backend API
    this.http.post('https://localhost:7001/api/Gallery/add-picture', formData)
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
    this.http.post('https://localhost:7001/api/Gallery/createGalleryTexts', this.sectionTexts)
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
}

class GalleryPictures {
  id: number = 0;
  mediaType: string = '';
  picture: string = '';
  url: string = '';
}

class GallerySectionTexts {
  id: number = 0;
  titleEn: string = '';
  titleTextEn: string = '';
  titleKa: string = '';
  titleTextKa: string = '';
  titleRu: string = '';
  titleTextRu: string = '';
}
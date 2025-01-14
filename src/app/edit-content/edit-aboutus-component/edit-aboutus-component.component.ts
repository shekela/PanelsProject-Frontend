import { Component } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-aboutus-component',
  templateUrl: './edit-aboutus-component.component.html',
  styleUrls: ['./edit-aboutus-component.component.css']
})
export class EditAboutusComponentComponent {
  activePopup: string | null = null;

  greetingTextEn: string = '';
  greetingTextKa: string = '';
  greetingTextRu: string = '';
  backgroundImage: File | null = null;

  textBoxOneTitleEn: string = '';
  textBoxOneDescriptionEn: string = '';
  textBoxOneTitleKa: string = '';
  textBoxOneDescriptionKa: string = '';
  textBoxOneTitleRu: string = '';
  textBoxOneDescriptionRu: string = '';

  textBoxTwoTitleEn: string = '';
  textBoxTwoDescriptionEn: string = '';
  textBoxTwoTitleKa: string = '';
  textBoxTwoDescriptionKa: string = '';
  textBoxTwoTitleRu: string = '';
  textBoxTwoDescriptionRu: string = '';

  constructor(private requestService: RequestsService) {}

  // Function to handle the background image upload
  handleFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.backgroundImage = file;
    }
  }

  // Function to submit Greeting Texts & Background Image
  submitGreetingAndImage(): void {
    if (this.greetingTextEn && this.greetingTextKa && this.greetingTextRu && this.backgroundImage) {
      const formData = new FormData();
      formData.append('greetingTextEn', this.greetingTextEn);
      formData.append('greetingTextKa', this.greetingTextKa);
      formData.append('greetingTextRu', this.greetingTextRu);
      formData.append('backgroundImage', this.backgroundImage);

      this.requestService.updateAboutUsGreetingAndImage(formData).subscribe(
        response => {
          this.closePopup();
        },
        error => {
          console.error('Error updating Greeting Texts and Image:', error);
        }
      );
    } else {
      alert('Please fill out all the fields and upload an image.');
    }
  }

  // Function to submit Text Box One Data
  submitTextBoxOne(): void {
    const formData = new FormData();
    formData.append('textBoxOneTitleEn', this.textBoxOneTitleEn || '');
    formData.append('textBoxOneDescriptionEn', this.textBoxOneDescriptionEn || '');
    formData.append('textBoxOneTitleKa', this.textBoxOneTitleKa || '');
    formData.append('textBoxOneDescriptionKa', this.textBoxOneDescriptionKa || '');
    formData.append('textBoxOneTitleRu', this.textBoxOneTitleRu || '');
    formData.append('textBoxOneDescriptionRu', this.textBoxOneDescriptionRu || '');

    // Send FormData to the backend
    this.requestService.updateAboutUsTextBoxOne(formData).subscribe(
      response => {
        this.closePopup();
      },
      error => {
        console.error('Error updating Text Box One:', error);
      }
    );
  }

  // Function to submit Text Box Two Data
  submitTextBoxTwo(): void {
    const formData = new FormData();
    formData.append('textBoxTwoTitleEn', this.textBoxTwoTitleEn || '');
    formData.append('textBoxTwoDescriptionEn', this.textBoxTwoDescriptionEn || '');
    formData.append('textBoxTwoTitleKa', this.textBoxTwoTitleKa || '');
    formData.append('textBoxTwoDescriptionKa', this.textBoxTwoDescriptionKa || '');
    formData.append('textBoxTwoTitleRu', this.textBoxTwoTitleRu || '');
    formData.append('textBoxTwoDescriptionRu', this.textBoxTwoDescriptionRu || '');

    // Send FormData to the backend
    this.requestService.updateAboutUsTextBoxTwo(formData).subscribe(
      response => {
        this.closePopup();
      },
      error => {
        console.error('Error updating Text Box Two:', error);
      }
    );
  }
  openPopup(popup: string): void {
    this.activePopup = popup;
  }

  closePopup(): void {
    this.activePopup = null;
    this.clearFormFields(); // Clear fields when popup is closed
  }

  // Function to clear form fields
  private clearFormFields(): void {
    this.textBoxOneTitleEn = '';
    this.textBoxOneDescriptionEn = '';
    this.textBoxOneTitleKa = '';
    this.textBoxOneDescriptionKa = '';
    this.textBoxOneTitleRu = '';
    this.textBoxOneDescriptionRu = '';
    this.textBoxTwoTitleEn = '';
    this.textBoxTwoDescriptionEn = '';
    this.textBoxTwoTitleKa = '';
    this.textBoxTwoDescriptionKa = '';
    this.textBoxTwoTitleRu = '';
    this.textBoxTwoDescriptionRu = '';
  }


}

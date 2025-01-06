import { Component } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-informatiobanner-component',
  templateUrl: './edit-informatiobanner-component.component.html',
  styleUrls: ['./edit-informatiobanner-component.component.css']
})
export class EditInformatiobannerComponentComponent {
  banners: any[] = [];
  currentBanner: any = {};
  isProductPopupOpen = false;
  editMode = false;
  isDeletePopupOpen = false;
  successMessage: string = '';

  constructor(private requestService: RequestsService) {}

  ngOnInit(): void {
    this.getBanners();
  }

  getBanners(): void {
    this.requestService.getInformationBanners().subscribe((data: any) => {
      this.banners = data;
    });
  }

  openEditBannerPopup(banner: any): void {
    this.currentBanner = { ...banner };
    this.editMode = true;
    this.isProductPopupOpen = true;
  }

  closeProductPopup(): void {
    this.isProductPopupOpen = false;
  }

  saveBanner(): void {
    if (this.editMode) {
      this.requestService.updateBanner(this.currentBanner.id, this.currentBanner).subscribe(
        (response: any) => {
          this.successMessage = response.message;
          this.getBanners();  // Refresh banners list
          this.closeProductPopup();
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else {
      this.requestService.addBanner(this.currentBanner).subscribe(
        (response: any) => {
          this.successMessage = response.message;
          this.getBanners();  // Refresh banners list
          this.closeProductPopup();
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  openDeletePopup(bannerId: number): void {
    this.isDeletePopupOpen = true;
    this.currentBanner.id = bannerId;
  }

  closeDeletePopup(): void {
    this.isDeletePopupOpen = false;
  }

  deleteBanner(): void {
    this.requestService.deleteBanner(this.currentBanner.id).subscribe(
      (response: any) => {
        this.successMessage = response.message;
        this.getBanners();  // Refresh banners list
        this.closeDeletePopup();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  openAddBannerPopup(): void {
    this.currentBanner = {};
    this.editMode = false;
    this.isProductPopupOpen = true;
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Convert file to a URL or upload it
      const reader = new FileReader();
      reader.onload = () => {
        this.currentBanner.BackgroundUrl = reader.result as string; // Set the image URL to BackgroundUrl property
      };
      reader.readAsDataURL(file);
    }
  }
}

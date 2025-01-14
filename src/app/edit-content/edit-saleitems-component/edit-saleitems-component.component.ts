import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { RequestsService } from 'src/app/services/requests.service';
import { SeparationService } from 'src/app/services/separation.service';

@Component({
  selector: 'app-edit-saleitems-component',
  templateUrl: './edit-saleitems-component.component.html',
  styleUrls: ['./edit-saleitems-component.component.css']
})
export class EditSaleitemsComponentComponent {
  saleItems: any[] = [];
  newSaleItem: any = {
    titleEn: '',
    descriptionEn: '',
    titleKa: '',
    descriptionKa: '',
    titleRu: '',
    descriptionRu: '',
  };
  selectedFile: File | null = null;
  showPopup: boolean = false;
  popupMessage: string = '';
  showDeletePopup: boolean = false;
  itemToDelete: any = null;

  constructor(private requestService: RequestsService, private languageService: LanguageService, private separationService: SeparationService) {}

  ngOnInit(): void {
    this.getSaleItems();
  }

  // Fetch all sale items
  getSaleItems() {
    this.requestService.getSaleItems().subscribe(
      (data: any) => {
        this.saleItems = data.map((item: any) => ({
          ...item,
          picture: item.picture ? `https://panelsprojectbackend-dvhuaffabfd2ejbs.southeastasia-01.azurewebsites.net${item.picture}` : null
        }));
      },
      (error) => {
        console.error('Error fetching sale items', error);
      }
    );
  }

  // Add a new sale item
  onAddSaleItem() {
    this.requestService.addSaleItem(this.newSaleItem, this.selectedFile).subscribe(
      (response) => {
        this.popupMessage = 'Sale item added successfully!';
        this.showPopup = true;
        this.getSaleItems(); // Refresh the list
        this.newSaleItem = {}; // Clear form
      },
      (error) => {
        console.error('Error adding sale item', error);
      }
    );
  }


  // Handle file input
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Close the popup
  closePopup() {
    this.showPopup = false;
  }

  onDeleteSaleItem(id: number) {
    this.itemToDelete = id;
    this.showDeletePopup = true;
  }

  confirmDelete() {
    if (this.itemToDelete !== null) {
      this.requestService.deleteSaleItem(this.itemToDelete).subscribe(
        (response: any) => {
          this.saleItems = this.saleItems.filter(item => item.id !== this.itemToDelete);
          this.showDeletePopup = false;  // Close the popup
          this.itemToDelete = null;
          this.popupMessage = response.message;  // Show the success message
          this.showPopup = true;  // Show the success message popup
        },
        (error) => {
          console.error('Error deleting sale item', error);
        }
      );
      this.getSaleItems();  // Refresh the list after deleting
    }
  }

  cancelDelete() {
    this.showDeletePopup = false;
    this.itemToDelete = null;
  }

}

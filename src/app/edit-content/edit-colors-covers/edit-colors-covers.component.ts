import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { SeparationService } from 'src/app/services/separation.service';

export interface ColorAndCovers {
  id: number;
  titleEn: string;
  descriptionEn: string;
  buttonTextEn: string;
  titleKa: string;
  descriptionKa: string;
  buttonTextKa: string;
  titleRu: string;
  descriptionRu: string;
  buttonTextRu: string;
  backgroundUrl: string;
}

@Component({
  selector: 'app-edit-colors-covers',
  templateUrl: './edit-colors-covers.component.html',
  styleUrls: ['./edit-colors-covers.component.css']
})
export class EditColorsCoversComponent {
  
  products: ColorAndCovers[] = [];
  currentProduct: ColorAndCovers = this.initializeNewProduct();
  isProductPopupOpen = false;
  isDeletePopupOpen = false;
  editMode = false;
  productToDeleteId: number | null = null;
  selectedImageFile: File | null = null;

  constructor(private http: HttpClient, private languageService: LanguageService, private separationService: SeparationService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  initializeNewProduct(): ColorAndCovers {
    return {
      id: 0,
      titleEn: '',
      descriptionEn: '',
      buttonTextEn: '',
      titleKa: '',
      descriptionKa: '',
      buttonTextKa: '',
      titleRu: '',
      descriptionRu: '',
      buttonTextRu: '',
      backgroundUrl: ''
    };
  }

  loadProducts(): void {
    this.http.get<ColorAndCovers[]>('https://localhost:7001/api/ColorAndCovers/get-ColorAndCovers')
      .subscribe(data => {
        // Iterate over each product and ensure the backgroundUrl is prefixed with 'https://localhost:7001'
        this.products = data.map(product => {
          if (product.backgroundUrl && !product.backgroundUrl.startsWith('https://localhost:7001')) {
            product.backgroundUrl = 'https://localhost:7001' + product.backgroundUrl;
          }
          return product;
        });
      });
    this.refreshTranslations();
  }
  

  openAddProductPopup(): void {
    this.isProductPopupOpen = true;
    this.editMode = false;
    this.currentProduct = this.initializeNewProduct();
  }

  openEditProductPopup(product: ColorAndCovers): void {
    this.isProductPopupOpen = true;
    this.editMode = true;
    this.currentProduct = { ...product };
  }
  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      // Get the uploaded file
      this.selectedImageFile = input.files[0];
    }
  }

  saveProduct(): void {
    const formData = new FormData();
  
    // Append text fields to the form data
    formData.append('id', this.currentProduct.id.toString());
    formData.append('titleEn', this.currentProduct.titleEn);
    formData.append('descriptionEn', this.currentProduct.descriptionEn);
    formData.append('buttonTextEn', this.currentProduct.buttonTextEn);
    formData.append('titleKa', this.currentProduct.titleKa);
    formData.append('descriptionKa', this.currentProduct.descriptionKa);
    formData.append('buttonTextKa', this.currentProduct.buttonTextKa);
    formData.append('titleRu', this.currentProduct.titleRu);
    formData.append('descriptionRu', this.currentProduct.descriptionRu);
    formData.append('buttonTextRu', this.currentProduct.buttonTextRu);
  
    // Append the file to the form data (if a file is uploaded)
    if (this.selectedImageFile) {
      formData.append('backgroundImage', this.selectedImageFile, this.selectedImageFile.name);
    }
  
    // Send the appropriate HTTP request based on editMode (PUT or POST)
    if (this.editMode) {
      // PUT request for updating product
      this.http.put(`https://localhost:7001/api/ColorAndCovers/update-product/${this.currentProduct.id}`, formData)
        .subscribe(() => {
          this.loadProducts();
          this.closeProductPopup();
        });
    } else {
      // POST request for adding a new product
      this.http.post('https://localhost:7001/api/ColorAndCovers/add-product', formData)
        .subscribe(() => {
          this.loadProducts();
          this.closeProductPopup();
        });
    }
  }
  
  

  closeProductPopup(): void {
    this.isProductPopupOpen = false;
  }

  openDeleteConfirmation(id: number): void {
    this.isDeletePopupOpen = true;
    this.productToDeleteId = id;
  }

  deleteProduct(): void {
    if (this.productToDeleteId !== null) {
      this.http.delete(`https://localhost:7001/api/ColorAndCovers/delete-color-and-covers/${this.productToDeleteId}`)
        .subscribe(() => {
          this.loadProducts();
          this.closeDeletePopup();
        });
    }
  }

  closeDeletePopup(): void {
    this.isDeletePopupOpen = false;
  }

  private refreshTranslations() {
    const currentLanguage = this.languageService.getCurrentLanguage();
    this.separationService.fetchColorAndCovers(currentLanguage);
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { RequestsService } from 'src/app/services/requests.service';
import { SeparationService } from 'src/app/services/separation.service';

export interface ProductSliderCatalog {
  id: number;             // Unique ID for the product (for deletion)
  titleEn: string;        // Title in English
  titleKa: string;        // Title in Georgian
  titleRu: string;        // Title in Russian
  backgroundUrl: string;  // Background image URL
}

@Component({
  selector: 'app-edit-product-catalog-slider',
  templateUrl: './edit-product-catalog-slider.component.html',
  styleUrls: ['./edit-product-catalog-slider.component.css']
})

export class EditProductCatalogSliderComponent {
  products: ProductSliderCatalog[] = [];
  newProduct: ProductSliderCatalog = {
    id: 0, // default id, will be assigned when adding
    titleEn: '',
    titleKa: '',
    titleRu: '',
    backgroundUrl: ''
  };
  isPopupOpen = false;
  isConfirmDeleteOpen = false;  // Flag to show confirmation modal
  productToDelete: ProductSliderCatalog | null = null;  // The product to be deleted
  selectedFile: File | undefined;


  constructor(private requestService: RequestsService, private languageService: LanguageService, private separationService: SeparationService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  

  // Fetch all products
  private loadProducts(): void {
    this.requestService.getProductsCatalogSlider()
      .subscribe((data) => {
        // Update the products with the correct background URL
        this.products = data.map(product => {
          if (!product.backgroundUrl.startsWith('https://localhost:7001')) {
            product.backgroundUrl = `https://localhost:7001${product.backgroundUrl}`;
          }
          return product;
        });
      });
  }
  
  // Open the popup to add new product
  openPopup(): void {
    this.isPopupOpen = true;
  }

  // Close the popup
  closePopup(): void {
    this.isPopupOpen = false;
  }

  // Add a new product to the catalog
  addProduct(): void {
    const formData = new FormData();
    formData.append('titleEn', this.newProduct.titleEn);
    formData.append('titleKa', this.newProduct.titleKa);
    formData.append('titleRu', this.newProduct.titleRu);

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    // Send the form data (including the file)
    this.requestService.addProductsSliderProduct(formData)
      .subscribe({
        next: () => {
          this.loadProducts(); // Reload products list after adding
          this.refreshTranslations();
          this.closePopup();
        },
        error: (err) => {
          console.error('Error adding product:', err);
        }
      });
  }

  // Open the confirmation modal for deleting a product
  openConfirmDelete(product: ProductSliderCatalog): void {
    this.productToDelete = product;
    this.isConfirmDeleteOpen = true;
  }

  // Close the confirmation modal
  closeConfirmDelete(): void {
    this.isConfirmDeleteOpen = false;
    this.productToDelete = null;
  }

  // Delete the product after confirmation
  confirmDeleteProduct(): void {
    if (this.productToDelete) {
      this.requestService.deleteProductsSliderProduct(this.productToDelete.id)
        .subscribe({
          next: () => {
            this.loadProducts(); // Reload products list after deleting
            this.refreshTranslations()
            this.closeConfirmDelete(); // Close the confirmation modal
          },
          error: (err) => {
            console.error('Error deleting product:', err);
          }
        });
    }
  }

  private refreshTranslations() {
    const currentLanguage = this.languageService.getCurrentLanguage();
    this.separationService.fetchProductsCatalogSlider(currentLanguage);
  }


  ngOnInit(): void {
    this.loadProducts(); // Load products on component initialization
  }
}
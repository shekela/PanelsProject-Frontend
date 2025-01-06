import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';
import { MainProductsInterface } from 'src/app/models/mainproducts.model';
import { LanguageService } from 'src/app/services/language.service';
import { ProductSwitcherService } from 'src/app/services/product-switcher.service';
import { mainProductSections, MainProductsPage, products, RequestsService } from 'src/app/services/requests.service';
import { SeparationService } from 'src/app/services/separation.service';

@Component({
  selector: 'app-edit-main-products',
  templateUrl: './edit-main-products.component.html',
  styleUrls: ['./edit-main-products.component.css']
})
export class EditMainProductsComponent implements OnInit {
  selectedFile: File | undefined;

  currentProduct: products = {
    id: 0,
    titleEn: '',
    titleKa: '',
    titleRu: '',
    descriptionEn: '',
    descriptionKa: '',
    descriptionRu: '',
    buttonTextEn: '',
    buttonTextKa: '',
    buttonTextRu: '',
    backgroundUrl: ''
  };


  mainProducts = {
    titleEn: '',
    titleKa: '',
    titleRu: '',
    titleTextEn: '',
    titleTextKa: '',
    titleTextRu: ''
  };

  products: products[] = [];
  newProduct!: products;
  editingProduct: boolean = false;
  showModal: boolean = false; // Variable to control modal visibility
  modalTitle: string = 'Add Product'; // Set title dynamically based on action

  constructor(
    private requestsService: RequestsService, 
    private separationService: SeparationService
  ) {}

  ngOnInit(): void {
    this.fetchMainProductsData();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file || undefined;
  }

  fetchMainProductsData(): void {
    Promise.all([
      this.separationService.fetchMainProducts('ENG'),
      this.separationService.fetchMainProducts('GEO'),
      this.separationService.fetchMainProducts('RUS')
    ]).then(() => {
      const translationsENG = this.separationService.translations.mainProducts['ENG'];
      const translationsGEO = this.separationService.translations.mainProducts['GEO'];
      const translationsRUS = this.separationService.translations.mainProducts['RUS'];
  
      this.mainProducts = {
        titleEn: translationsENG.title || '',
        titleKa: translationsGEO.title || '',
        titleRu: translationsRUS.title || '',
        titleTextEn: translationsENG.titleText || '',
        titleTextKa: translationsGEO.titleText || '',
        titleTextRu: translationsRUS.titleText || ''
      };
  
      this.products = translationsENG.products.map((productENG, index) => {
        const productGEO = translationsGEO.products[index] || {};
        const productRUS = translationsRUS.products[index] || {};
      
        return {
          id: productENG.id !== undefined ? productENG.id : 0,  // Fallback to 0 if id is undefined
          titleEn: productENG.title || '',
          titleKa: productGEO.title || '',
          titleRu: productRUS.title || '',
          descriptionEn: productENG.description || '',
          descriptionKa: productGEO.description || '',
          descriptionRu: productRUS.description || '',
          buttonTextEn: productENG.buttonText || '',
          buttonTextKa: productGEO.buttonText || '',
          buttonTextRu: productRUS.buttonText || '',
          backgroundUrl: productENG.backgroundUrl || ''
        };
      });
    }).catch(error => {
      console.error('Error fetching translations:', error);
    });
  }

  addProduct(): void {
  const formData = this.createProductFormData();

  this.requestsService.addProduct(formData).subscribe(
    (response: { id: any }) => {
      this.fetchMainProductsData();
      this.products.push({ ...this.newProduct, id: response.id });
      this.newProduct = this.resetProduct();
      this.closeModal();
    },
    (error: any) => alert(error)
  );
}

updateProduct(): void {
  if (this.newProduct.id === 0) {
    console.error('Invalid product ID');
    return;
  }

  const formData = this.createProductFormData();

  this.requestsService.updateProduct(this.newProduct.id, formData).subscribe(
    () => {
      this.fetchMainProductsData();
      this.newProduct = this.resetProduct();
      this.closeModal();
    },
    (error: any) => {
      console.error('Error updating product:', error);
    }
  );
}

private createProductFormData(): FormData {
  const formData = new FormData();

  // Append product fields
  Object.keys(this.newProduct).forEach((key) => {
    formData.append(key, (this.newProduct as any)[key]);
  });

  // Append file if selected
  if (this.selectedFile) {
    formData.append('imageFile', this.selectedFile);
  }

  return formData;
}

  deleteProduct(product: products): void {
    this.requestsService.deleteProduct(product.id).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.products = this.products.filter(p => p.id !== product.id);
        this.fetchMainProductsData()
      },
      (error: any) => console.error('Error deleting product:', error)
    );
  }

  updateMainProducts(): void {
    console.log(this.mainProducts); // Check the values before submitting
    this.requestsService.updateMainProductSection(this.mainProducts).subscribe(
      (response) => {
        this.fetchMainProductsData()
      },
      (error) => console.error('Error updating main products:', error)
    );
    this.closeMainProductsModal()
  }

  openAddProductModal(): void {
    this.newProduct = this.resetProduct();
    this.editingProduct = false;
    this.modalTitle = 'Add Product';
    this.showModal = true;
  }

  openEditProductModal(product: products): void {
    console.log('Product to edit:', product); // Add a console log to verify the product
    this.newProduct = product;
    this.editingProduct = true;
    this.modalTitle = 'Edit Product';
    this.showModal = true;
  }
  
  closeModal(): void {
    this.showModal = false;
  }

  resetProduct(): products {
    return {
      id: 0,
      titleEn: '',
      titleKa: '',
      titleRu: '',
      descriptionEn: '',
      descriptionKa: '',
      descriptionRu: '',
      buttonTextEn: '',
      buttonTextKa: '',
      buttonTextRu: '',
      backgroundUrl: ''
    };
  }

  saveProduct(): void {
    if (this.editingProduct) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
    this.closeModal();
  }

  showMainProductsModal: boolean = false;

openMainProductsModal(): void {
  this.showMainProductsModal = true;
}

closeMainProductsModal(): void {
  this.showMainProductsModal = false;
}
}
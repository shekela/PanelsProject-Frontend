import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { GalleryObjectModel } from '../models/gallery-objects.model';
import { GalleryComponentTextsInterface } from '../models/gallery-component-texts.model';
import { VideoCatalogDto } from '../edit-content/edit-video-catalog/edit-video-catalog.component';
import { ProductSliderCatalog } from '../edit-content/edit-product-catalog-slider/edit-product-catalog-slider.component';

export interface MarketingBanner {
  id: number;
  titleEn: string;
  aimEn: string;
  descriptionEn: string;
  titleRu: string;
  aimRu: string;
  descriptionRu: string;
  titleKa: string;
  aimKa: string;
  descriptionKa: string;
  imgUrl: string;
}

export interface VideoCatalog {
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

export interface mainProductSections
{
  id: number;
  titleEn: string;
  titleTextEn: string;
  titleKa: string;
  titleTextKa: string;
  titleRu: string;
  titleTextRu: string;
}
export interface products {
  id: number;
  titleEn: string;
  titleKa: string;
  titleRu: string;
  descriptionEn: string;
  descriptionKa: string;
  descriptionRu: string;
  buttonTextEn: string;
  buttonTextKa: string;
  buttonTextRu: string;
  backgroundUrl: string;
}

export interface MainProductsPage{
  mainProductSections: mainProductSections[],
  products: products[]
}

export interface ProductsCatalogSlider{
    id: number,
    titleEn: string;
    titleKa: string;
    titleRu: string;
    backgroundUrl: string;
}

export interface VoiceComperator{
  id: number;
  voiceAcupanel: string;
  voiceWOAcupanel: string;
}


@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) {}

  getMarketingBanners(): Observable<MarketingBanner[]> {
    return this.http.get<MarketingBanner[]>(`${environment.apiUrl}/MarektingBanner/get-marketingBanner`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getMainProductsPage(): Observable<MainProductsPage> {
    return this.http.get<MainProductsPage>(`${environment.apiUrl}/MainProductsSection/Combined`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getMainProducts(): Observable<products[]> {
    return this.http.get<products[]>(`https://localhost:7001/api/MainProductsSection/get-Products`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getVideoCatalog(): Observable<VideoCatalog[]> {
    return this.http.get<VideoCatalog[]>(`${environment.apiUrl}/VideoCatalog/get-videoCatalog`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getProductsCatalogSlider(): Observable<ProductsCatalogSlider[]> {
    return this.http.get<ProductsCatalogSlider[]>(`${environment.apiUrl}/ProductsSliderCatalog/get-ProductsCatalogSlider`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getVoiceComperator(): Observable<VoiceComperator[]> {
    return this.http.get<VoiceComperator[]>(`${environment.apiUrl}/VoiceComperator/get-VoiceExamples`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getColorAndCovers(): Observable<products[]> {
    return this.http.get<products[]>(`${environment.apiUrl}/ColorAndCovers/get-ColorAndCovers`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getGalleryTexts(): Observable<mainProductSections[]> {
    return this.http.get<mainProductSections[]>(`${environment.apiUrl}/Gallery/get-galleryTexts`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }  

  getGalleryPictures(): Observable<GalleryObjectModel[]> {
    return this.http.get<GalleryObjectModel[]>(`${environment.apiUrl}/Gallery/get-gallery`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }  

  submitMarketingBanner(bannerData: any, imageFile?: File): Observable<any> {
    const formData = new FormData();
    for (const key in bannerData) {
        if (bannerData.hasOwnProperty(key) && bannerData[key] !== undefined) {
            formData.append(key, bannerData[key]);
        }
    }
    if (imageFile) {
        formData.append('imageFile', imageFile);
    }
    return this.http.post('https://localhost:7001/api/MarektingBanner/CreateMarketingBanner', formData);
  }


  updateMainProductSection(mainProducts: any): Observable<any> {
    return this.http.post<any>('https://localhost:7001/api/MainProductsSection/createMainProductSectionText', mainProducts);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http
      .post(`https://localhost:7001/api/MainProductsSection/add-product`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error adding product:', error);
          return throwError(() => new Error('Failed to add product. Please try again.'));
        })
      );
  }
  
  updateProduct(productId: number, formData: FormData): Observable<any> {
    return this.http
      .put(`https://localhost:7001/api/MainProductsSection/update-product/${productId}`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error updating product:', error);
          return throwError(() => new Error('Failed to update product. Please try again.'));
        })
      );
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7001/api/MainProductsSection/delete-product/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting product:', error);
        return throwError(() => new Error('Failed to delete product. Please try again.'));
      })
    );
  }

  submitVideoCatalog(videoCatalog: any, backgroundFile?: File): Observable<any> {
    const formData = new FormData();
    for (const key in videoCatalog) {
      if (videoCatalog.hasOwnProperty(key) && videoCatalog[key] !== undefined) {
        formData.append(key, videoCatalog[key]);
      }
    }
    if (backgroundFile) {
      formData.append('backgroundFile', backgroundFile);
    }
    return this.http.post('https://localhost:7001/api/VideoCatalog/CreateVideoCatalog', formData);
  }


  addProductsSliderProduct(formData: FormData): Observable<any> {
    return this.http.post(`https://localhost:7001/api/ProductsSliderCatalog/add-product`, formData);
  }

  deleteProductsSliderProduct(productId: number): Observable<any> {
    return this.http.delete(`https://localhost:7001/api/ProductsSliderCatalog/delete-product/${productId}`);
  }


  getInformationBanners(): Observable<products[]> {
    return this.http.get<products[]>(`${environment.apiUrl}/InformationBanners/get-banners`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }  

  addBanner(banner: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/InformationBanners/add-banner`, banner);
  }

  updateBanner(id: number, banner: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/InformationBanners/update-banner/${id}`, banner);
  }

  deleteBanner(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/InformationBanners/delete-banner/${id}`);
  }


  getSaleItems(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/SaleItems/get-saleitems`);
  }

  // Add a new sale item
  addSaleItem(newSaleItem: any, selectedFile: File | null): Observable<any> {
    const formData = new FormData();
    for (const key in newSaleItem) {
      if (newSaleItem[key]) {
        formData.append(key, newSaleItem[key]);
      }
    }
    if (selectedFile) {
      formData.append('picture', selectedFile);
    }
    return this.http.post(`${environment.apiUrl}/SaleItems/add-saleitem`, formData);
  }

  // Delete a sale item
  deleteSaleItem(itemId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/SaleItems/delete-item/${itemId}`);
  }



  


}

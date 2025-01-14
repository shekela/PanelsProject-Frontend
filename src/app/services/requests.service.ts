import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { GalleryObjectModel } from '../models/gallery-objects.model';
import { MarketingBannerDto } from '../DTOS/MarketingBannerDto';
import { VideoCatalogDto } from '../DTOS/VideoCatalogDto';
import { mainProductSectionsDto } from '../DTOS/mainProductSectionsDto';
import { productsDto } from '../DTOS/productsDto';
import { MainProductsPageDto } from '../DTOS/MainProductsPageDto';
import { ProductsCatalogSliderDto } from '../DTOS/ProductsCatalogSliderDto';
import { VoiceComperatorDto } from '../DTOS/VoiceComperatorDto';
import { AboutUsDto } from '../DTOS/AboutUsDto';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) {}

  getMarketingBanners(): Observable<MarketingBannerDto[]> {
    return this.http.get<MarketingBannerDto[]>(`${environment.apiUrl}/MarektingBanner/get-marketingBanner`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getMainProductsPage(): Observable<MainProductsPageDto> {
    return this.http.get<MainProductsPageDto>(`${environment.apiUrl}/MainProductsSection/Combined`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getMainProducts(): Observable<productsDto[]> {
    return this.http.get<productsDto[]>(`${environment.apiUrl}/MainProductsSection/get-Products`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getVideoCatalog(): Observable<VideoCatalogDto[]> {
    return this.http.get<VideoCatalogDto[]>(`${environment.apiUrl}/VideoCatalog/get-videoCatalog`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getProductsCatalogSlider(): Observable<ProductsCatalogSliderDto[]> {
    return this.http.get<ProductsCatalogSliderDto[]>(`${environment.apiUrl}/ProductsSliderCatalog/get-ProductsCatalogSlider`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  getVoiceComperator(): Observable<VoiceComperatorDto[]> {
    return this.http.get<VoiceComperatorDto[]>(`${environment.apiUrl}/VoiceComperator/get-VoiceExamples`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }
  updateVoice(voiceId: number, formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/VoiceComperator/update-voice/${voiceId}`, formData);
  }

  deleteVoice(voiceId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/delete-voice/${voiceId}`);
  }

  // Method to add new voices (POST)
  addVoice(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/VoiceComperator/AddVoices`, formData);
  }

  getColorAndCovers(): Observable<productsDto[]> {
    return this.http.get<productsDto[]>(`${environment.apiUrl}/ColorAndCovers/get-ColorAndCovers`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }

  deleteColorAndCoversProduct(id: number): Observable<any> {
    const url = `${environment.apiUrl}/ColorAndCovers/delete-color-and-covers/${id}`;
    return this.http.delete(url);
  }
  

  updateColorAndCoversProduct(id: number, formData: any): Observable<any> {
    const url = `${environment.apiUrl}/ColorAndCovers/update-product/${id}`;
    return this.http.put(url, formData);
  }
  
  addColorAndCoversProduct(formData: any): Observable<any> {
    const url = `${environment.apiUrl}/ColorAndCovers/add-product`;
    return this.http.post(url, formData);
  }

  getGalleryTexts(): Observable<mainProductSectionsDto[]> {
    return this.http.get<mainProductSectionsDto[]>(`${environment.apiUrl}/Gallery/get-galleryTexts`).pipe(
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

  addGalleryPicture(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Gallery/add-picture`, formData);
  }

  updateGalleryTexts(sectionTexts: mainProductSectionsDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Gallery/createGalleryTexts`, sectionTexts);
  }

  deleteGalleryPicture(pictureId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/Gallery/delete-picture/${pictureId}`);
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
    return this.http.post(`${environment.apiUrl}/MarektingBanner/CreateMarketingBanner`, formData);
  }

  updateMainProductSection(mainProducts: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/MainProductsSection/createMainProductSectionText`, mainProducts);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/MainProductsSection/add-product`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error adding product:', error);
          return throwError(() => new Error('Failed to add product. Please try again.'));
        })
      );
  }
  
  updateProduct(productId: number, formData: FormData): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/MainProductsSection/update-product/${productId}`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error updating product:', error);
          return throwError(() => new Error('Failed to update product. Please try again.'));
        })
      );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/MainProductsSection/delete-product/${id}`).pipe(
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
    return this.http.post(`${environment.apiUrl}/VideoCatalog/CreateVideoCatalog`, formData);
  }


  addProductsSliderProduct(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/ProductsSliderCatalog/add-product`, formData);
  }

  deleteProductsSliderProduct(productId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/ProductsSliderCatalog/delete-product/${productId}`);
  }


  getInformationBanners(): Observable<productsDto[]> {
    return this.http.get<productsDto[]>(`${environment.apiUrl}/InformationBanners/get-banners`).pipe(
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

  deleteSaleItem(itemId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/SaleItems/delete-item/${itemId}`);
  }
  
  getAboutUsPage(): Observable<AboutUsDto[]> {
    return this.http.get<AboutUsDto[]>(`${environment.apiUrl}/AboutUs/get-aboutUsPage`).pipe(
      catchError((error) => {
        console.error('Error fetching about us page:', error);
        return throwError(() => new Error('Failed to fetch about us page. Please try again later.'));
      })
    );
  }

  updateAboutUsGreetingAndImage(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/AboutUs/create-greeting`, formData);
  }

  updateAboutUsTextBoxOne(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/AboutUs/create-greeting`, data);
  }

  updateAboutUsTextBoxTwo(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/AboutUs/create-greeting`, data);
  }
}


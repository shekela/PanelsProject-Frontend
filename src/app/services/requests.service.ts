import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

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

  getVideoCatalog(): Observable<VideoCatalog[]> {
    return this.http.get<VideoCatalog[]>(`${environment.apiUrl}/VideoCatalog/get-videoCatalog`).pipe(
      catchError((error) => {
        console.error('Error fetching marketing banners:', error);
        return throwError(() => new Error('Failed to fetch marketing banners. Please try again later.'));
      })
    );
  }


}

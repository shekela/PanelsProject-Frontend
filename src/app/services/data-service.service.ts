import { Injectable } from '@angular/core';
import { marketingBannerData } from '../DUMMY_DATA/dummy-mbanner-data';
import { dummyProducts } from '../DUMMY_DATA/dummy-products';
import { VideoCatalogData } from '../DUMMY_DATA/dummy-videocatalog-data';
import { GalleryObjectModel } from '../models/gallery-objects.model';
import { GalleryObjects } from '../DUMMY_DATA/dummy-gallery-objects';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
   //Header logo where brand logo appears in navigation bar//
   brandLogo: string = 'assets/WoodUpp-logo.svg';
   

   //Below the header section marketing section where appears image and text of current sale and offer CONTAINS TEXT AND IMAGE URL//
   marketingBannerData = marketingBannerData;

   //Below the marketing section where appears 4 boxes with data over image describes products//
   mainProductsData = dummyProducts;
   titleMP: string = 'Explore our products'; //Title for main products section
   titleTextMP: string = 'We help people create calm spaces through our Scandinavian designs. Our products transform the way rooms look and sound, making a positive difference in people’s lives.'; //Text under title for main products section

   //VIDEO CATALOG//
   videoCatalogData = VideoCatalogData;


   //Gallery section where you can take a look of pictures and then go to instagram link
   instagramPageName = 'wood_upp'
   galleryPictures: GalleryObjectModel[] = GalleryObjects;
}

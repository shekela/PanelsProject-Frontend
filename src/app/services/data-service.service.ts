import { Injectable } from '@angular/core';
import { GalleryObjectModel } from '../models/gallery-objects.model';
import { GalleryObjects } from '../DUMMY_DATA/dummy-gallery-objects';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
   brandLogo: string = 'assets/WoodUpp-logo.svg';
   
   instagramPageName = 'wood_upp'
   galleryPictures: GalleryObjectModel[] = GalleryObjects;
}

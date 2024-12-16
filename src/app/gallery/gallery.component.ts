import { ChangeDetectorRef, Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { GalleryObjects } from '../DUMMY_DATA/dummy-gallery-objects'; 
import { GalleryObjectModel } from '../models/gallery-objects.model';
import { DataServiceService } from '../services/data-service.service';
import { GalleryComponentTexts } from '../DUMMY_DATA/GALLERY-COMPONENT-DATA/eng';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent {
private languageSubscription: Subscription | null = null; // Initialize as null
private dataService = inject(DataServiceService);

componentTexts = GalleryComponentTexts;




instagramPageName = this.dataService.instagramPageName;
isInstagramCatalogLoaded = false;

pictures: GalleryObjectModel[] = GalleryObjects; // Original array of pictures
displayedPictures: GalleryObjectModel[] = []; // Pictures currently displayed
totalPictures: number = this.pictures.length; // Total number of pictures
loadedCount: number = 0; // Number of pictures currently loaded
progressPercentage: number = 0; // Progress percentage

mainPicture?: GalleryObjectModel;
leftPicture?: any;
rightPicture?: any;

constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef, private languageService: LanguageService) {
  const heightPattern = [118, 190, 118, 190, 118, 118, 190, 190, 118, 190, 118, 190];

  this.pictures = this.pictures.map((pic, index) => {
    const height = heightPattern[index % heightPattern.length]; 
    return {
      ...pic,
      height: `${height}px`, 
      rowSpan: Math.ceil(height / 8), 
    };
  });

  this.loadMore();
}

loadMore(): void {
  const nextBatch = this.pictures.slice(
    this.loadedCount,
    this.loadedCount + 9
  ); 
  this.displayedPictures = [...this.displayedPictures, ...nextBatch]; 
  this.loadedCount = this.displayedPictures.length; 
  this.progressPercentage = Math.ceil(
    (this.loadedCount / this.totalPictures) * 100
  ); 
}

onCatalogLoad(picture: GalleryObjectModel) {
  const index = this.pictures.findIndex(obj => obj === picture);
  this.mainPicture = picture;
  this.leftPicture = index > 0 ? this.pictures[index - 1] : this.pictures[this.pictures.length - 1]; // Circular navigation
  this.rightPicture =
    index < this.pictures.length - 1
      ? this.pictures[index + 1]
      : this.pictures[0]; // Circular navigation

  this.isInstagramCatalogLoaded = true;
  this.renderer.addClass(document.body, 'no-scroll');
}

onChangeToLeft(): void {
  if (!this.leftPicture) {
    return; 
  }

  const currentIndex = this.pictures.findIndex(
    obj => obj === this.leftPicture
  );

  this.mainPicture = this.leftPicture;

  // Circular navigation for left picture
  this.leftPicture = currentIndex > 0 ? this.pictures[currentIndex - 1] : this.pictures[this.pictures.length - 1]; 
  this.rightPicture =
    currentIndex < this.pictures.length - 1
      ? this.pictures[currentIndex + 1]
      : this.pictures[0]; // Circular navigation
}

onChangeToRight(): void {
  if (!this.rightPicture) {
    return;
  }

  const currentIndex = this.pictures.findIndex(
    obj => obj === this.rightPicture
  );

  this.mainPicture = this.rightPicture;

  // Circular navigation for right picture
  this.leftPicture = currentIndex > 0 ? this.pictures[currentIndex - 1] : this.pictures[this.pictures.length - 1]; 
  this.rightPicture =
    currentIndex < this.pictures.length - 1
      ? this.pictures[currentIndex + 1]
      : this.pictures[0]; // Circular navigation
}

onCatalogClose() {
  this.isInstagramCatalogLoaded = false;
  this.renderer.removeClass(document.body, 'no-scroll');
}


onVideoHover(event: MouseEvent): void {
  console.log('hover');
  const video = event.target as HTMLVideoElement;
  video.muted = true;
  video.play().catch((err) => console.warn('Error playing video:', err));
}

onVideoLeave(event: MouseEvent): void {
  console.log('leave');
  const video = event.target as HTMLVideoElement;
  video.pause();
  video.currentTime = 0;
}


ngOnInit(): void {
  this.languageSubscription = this.languageService.language$.subscribe((language) => {
    this.componentTexts = this.languageService.getGalleryComponentsTextsTranslation(language);
  });
}

ngOnDestroy(): void {
  // Unsubscribe to prevent memory leaks
  if (this.languageSubscription) {
    this.languageSubscription.unsubscribe();
  }
}

}

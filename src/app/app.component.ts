import { Component, inject } from '@angular/core';
import { marketingBannerData } from './DUMMY_DATA/dummy-mbanner-data';
import { dummyProducts } from './DUMMY_DATA/dummy-products'; 
import { VideoCatalogData } from './DUMMY_DATA/dummy-videocatalog-data';
import { ProductsToChoose } from './DUMMY_DATA/dummy-choose-product';
import { BackgroundContentModel } from './models/backgoundcontent.model';
import { ProductSwitcherService } from './services/product-switcher.service';
import { DataServiceService } from './services/data-service.service';
import { GalleryObjectModel } from './models/gallery-objects.model';
import { GalleryObjects } from './DUMMY_DATA/dummy-gallery-objects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private productService: ProductSwitcherService){

  }
  private dataService = inject(DataServiceService);

  marketingBannerData = this.dataService.marketingBannerData;


  mainProductsData = this.dataService.mainProductsData; // Products objects for main products component section
  titleMP = this.dataService.titleMP; // Title for main products component section
  titleTextMP = this.dataService.titleTextMP; // Text under title for main products component section


  videoCatalogData = this.dataService.videoCatalogData;

  colorAndCoversProducts = [
    {
      backgroundUrl: 'https://ccfssflq.photoncache.com/wp-content/uploads/2024/05/beige4-cgi2-1536x1536.jpg',
      title: 'Akupanels',
      description: ' Panels from €125. Create a modern space and improve the acoustics',
      buttonText: 'See all the colors',
      height: "320px",
      width: "790px",
    },
    {
      backgroundUrl: 'https://ccfssflq.photoncache.com/wp-content/uploads/2023/08/akupanel-60-showcase-classic.jpg',
      title: ' WoodUpp Covers',
      description: 'Our first collection has just landed',
      buttonText: 'Explore selection',
      height: "320px",
      width: "527px",
    }
  ]

}

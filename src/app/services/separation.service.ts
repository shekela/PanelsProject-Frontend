import { Injectable } from "@angular/core";
import { RequestsService } from "./requests.service";


import { marketingBannerData as marketingBannerDataENG } from '../DUMMY_DATA/MARKETING-HEADER-DATA/eng'; 
import { marketingBannerData as marketingBannerDataGEO } from '../DUMMY_DATA/MARKETING-HEADER-DATA/geo';
import { marketingBannerData as marketingBannerDataRUS } from '../DUMMY_DATA/MARKETING-HEADER-DATA/rus';

import { mainProductsComponent as mainProductsComponentENG } from '../DUMMY_DATA/MAINPRODUCTS-COMPONENT-DATA/eng';
import { mainProductsComponent as mainProductsComponentGEO } from '../DUMMY_DATA/MAINPRODUCTS-COMPONENT-DATA/geo';
import { mainProductsComponent as mainProductsComponentRUS } from '../DUMMY_DATA/MAINPRODUCTS-COMPONENT-DATA/rus';

import { VideoCatalogData as videoCatalogDataENG } from '../DUMMY_DATA/VIDEOCATALOG-COMPONENT-DATA/eng';
import { VideoCatalogData as videoCatalogDataRUS } from '../DUMMY_DATA/VIDEOCATALOG-COMPONENT-DATA/rus';
import { VideoCatalogData as videoCatalogDataGEO } from '../DUMMY_DATA/VIDEOCATALOG-COMPONENT-DATA/geo';

import { ProductsToChoose as productsToChooseENG } from '../DUMMY_DATA/PRODUCTSTOCHOOSE-DATA/eng';
import { ProductsToChoose as productsToChooseRUS } from '../DUMMY_DATA/PRODUCTSTOCHOOSE-DATA/rus';
import { ProductsToChoose as productsToChooseGEO } from '../DUMMY_DATA/PRODUCTSTOCHOOSE-DATA/geo';

import { colorAndCoversProducts as colorsAndCoversENG} from '../DUMMY_DATA/COLORANDCOVER-PRODUCTS-DATA/eng'; 
import { colorAndCoversProducts as colorsAndCoversGEO} from '../DUMMY_DATA/COLORANDCOVER-PRODUCTS-DATA/geo'; 
import { colorAndCoversProducts as colorsAndCoversRUS} from '../DUMMY_DATA/COLORANDCOVER-PRODUCTS-DATA/rus'; 

import { VoiceComperatorData as voiceComperatorENG } from '../DUMMY_DATA/VOICE-COMPERATOR-DATA/eng';
import { VoiceComperatorData as voiceComperatorGEO} from '../DUMMY_DATA/VOICE-COMPERATOR-DATA/geo';
import { VoiceComperatorData as voiceComperatorRUS } from '../DUMMY_DATA/VOICE-COMPERATOR-DATA/rus';

import { GalleryComponentTexts as galleryComponentTextsENG } from '../DUMMY_DATA/GALLERY-COMPONENT-DATA/eng';
import { GalleryComponentTexts as galleryComponentTextsGEO } from '../DUMMY_DATA/GALLERY-COMPONENT-DATA/geo';
import { GalleryComponentTexts as galleryComponentTextsRUS } from '../DUMMY_DATA/GALLERY-COMPONENT-DATA/rus';

import { InfoBannerContent as infoBannerContentENG } from '../DUMMY_DATA/INFO-BANNER-COMPONENT/eng';
import { InfoBannerContent as infoBannerContentRUS } from '../DUMMY_DATA/INFO-BANNER-COMPONENT/rus';
import { InfoBannerContent as infoBannerContentGEO } from '../DUMMY_DATA/INFO-BANNER-COMPONENT/geo';

import { ContactTextData as ContactTextDataENG } from '../DUMMY_DATA/CONTACT-COMPONENT/eng';
import { ContactTextData as ContactTextDataGEO } from '../DUMMY_DATA/CONTACT-COMPONENT/geo';
import { ContactTextData as ContactTextDataRUS } from '../DUMMY_DATA/CONTACT-COMPONENT/rus';

import { MenuParts as menuPartsENG } from '../DUMMY_DATA/MENUSECTIONS-DATA/eng';
import { MenuParts as menuPartsGEO } from '../DUMMY_DATA/MENUSECTIONS-DATA/geo';
import { MenuParts as menuPartsRUS } from '../DUMMY_DATA/MENUSECTIONS-DATA/rus';

import { HeaderContent as headerContentENG} from '../DUMMY_DATA/HEADERCOMPONENT-CONTENT/eng';
import { HeaderContent as headerContentGEO} from '../DUMMY_DATA/HEADERCOMPONENT-CONTENT/geo';
import { HeaderContent as headerContentRUS} from '../DUMMY_DATA/HEADERCOMPONENT-CONTENT/rus';

import { SaleItems as saleItemsENG } from '../DUMMY_DATA/SALE-ITEMS/eng';
import { SaleItems as saleItemsGEO } from '../DUMMY_DATA/SALE-ITEMS/geo';
import { SaleItems as saleItemsRUS } from '../DUMMY_DATA/SALE-ITEMS/rus';

import { BehaviorSubject } from "rxjs";
import { Translations } from "../models/translations.model";


@Injectable({
  providedIn: 'root'
})

export class SeparationService {
    private translationsSubject = new BehaviorSubject<Translations | null>(null);
    translations$ = this.translationsSubject.asObservable(); // Expose an observable for subscribers
  
    translations: Translations = {
        marketingBanner: {
            ENG: marketingBannerDataENG,
            GEO: marketingBannerDataGEO,
            RUS: marketingBannerDataRUS
          },
          mainProducts: {
            ENG: mainProductsComponentENG,
            GEO: mainProductsComponentGEO,
            RUS: mainProductsComponentRUS
          },
          videoCatalog: {
            ENG: videoCatalogDataENG,
            GEO: videoCatalogDataGEO,
            RUS: videoCatalogDataRUS
          },
          productsToChoose: {
            ENG: productsToChooseENG,
            GEO: productsToChooseGEO,
            RUS: productsToChooseRUS
          },
          colorsAndCovers: {
            ENG: colorsAndCoversENG,
            GEO: colorsAndCoversGEO,
            RUS: colorsAndCoversRUS
          },
          voiceComperator: {
            ENG: voiceComperatorENG,
            GEO: voiceComperatorGEO,
            RUS: voiceComperatorRUS
          },
          galleryComponentTexts: {
            ENG: galleryComponentTextsENG,
            GEO: galleryComponentTextsGEO,
            RUS: galleryComponentTextsRUS
          },
          infoBanners: {
            ENG: infoBannerContentENG,
            GEO: infoBannerContentGEO,
            RUS: infoBannerContentRUS
          },
          contactTextData: {
            ENG: ContactTextDataENG,
            GEO: ContactTextDataGEO,
            RUS: ContactTextDataRUS
          },
          menuParts: {
            ENG: menuPartsENG,
            GEO: menuPartsGEO,
            RUS: menuPartsRUS
          },
          headerContent: {
            ENG: headerContentENG,
            GEO: headerContentGEO,
            RUS: headerContentRUS
          },
          saleItems: {
            ENG: saleItemsENG,
            GEO: saleItemsGEO,
            RUS: saleItemsRUS
          }
    };
  
    constructor(private requestService: RequestsService) {
      const savedLanguage = localStorage.getItem('language') || 'GEO';
      this.fetchMarketingBanners(savedLanguage);
      this.fetchMainProducts(savedLanguage);
      this.fetchVideoCatalog(savedLanguage);
    }
    
  
    fetchMarketingBanners(selectedLanguage: string): Promise<void> {
        return new Promise((resolve, reject) => {
          this.requestService.getMarketingBanners().subscribe(
            (data) => {
              if (data && data.length > 0) {
                this.translations.marketingBanner['ENG'] = {
                  title: data[0].titleEn,
                  aim: data[0].aimEn,
                  description: data[0].descriptionEn,
                  imgUrl: data[0].imgUrl,
                };
                this.translations.marketingBanner['RUS'] = {
                  title: data[0].titleRu,
                  aim: data[0].aimRu,
                  description: data[0].descriptionRu,
                  imgUrl: data[0].imgUrl,
                };
                this.translations.marketingBanner['GEO'] = {
                  title: data[0].titleKa,
                  aim: data[0].aimKa,
                  description: data[0].descriptionKa,
                  imgUrl: data[0].imgUrl,
                };
              }
              console.log(this.translations.marketingBanner)
              this.translationsSubject.next(this.translations); // Emit updated translations
              resolve();
            },
            (error) => {
              console.error('Error in fetching marketing banners', error);
              reject(error);
            }
          );
        });
    }

    fetchMainProducts(selectedLanguage: string): Promise<void> {
        return new Promise((resolve, reject) => {
          this.requestService.getMainProductsPage().subscribe(
            (data) => {
              if (data) {
                this.translations.mainProducts['ENG'] = {
                    title: data.mainProductSections[0].titleEn,
                    titleText: data.mainProductSections[0].titleTextEn,
                    products: data.products.map(product => ({
                        title: product.titleEn,
                        description: product.descriptionEn,
                        buttonText: product.buttonTextEn,
                        backgroundUrl: product.backgroundUrl
                    }))
                };

                this.translations.mainProducts['RUS'] = {
                    title: data.mainProductSections[0].titleRu,
                    titleText: data.mainProductSections[0].titleTextRu,
                    products: data.products.map(product => ({
                        title: product.titleRu,
                        description: product.descriptionRu,
                        buttonText: product.buttonTextRu,
                        backgroundUrl: product.backgroundUrl
                    }))
                };
                this.translations.mainProducts['GEO'] = {
                    title: data.mainProductSections[0].titleKa,
                    titleText: data.mainProductSections[0].titleTextKa,
                    products: data.products.map(product => ({
                        title: product.titleKa,
                        description: product.descriptionKa,
                        buttonText: product.buttonTextKa,
                        backgroundUrl: product.backgroundUrl
                    }))
                };
              }
              console.log(data)
              this.translationsSubject.next(this.translations); // Emit updated translations
              resolve();
            },
            (error) => {
              console.error('Error in fetching marketing banners', error);
              reject(error);
            }
          );
          
        });
    }

    fetchVideoCatalog(selectedLanguage: string): Promise<void> {
        return new Promise((resolve, reject) => {
          this.requestService.getVideoCatalog().subscribe(
            (data) => {
              if (data) {
                this.translations.videoCatalog['ENG'] = {
                    title: data[0].titleEn,
                    buttonText: data[0].buttonTextEn,
                    description: data[0].descriptionEn,
                    backgroundUrl: data[0].backgroundUrl,
                };

                this.translations.videoCatalog['RUS'] = {
                    title: data[0].titleRu,
                    buttonText: data[0].buttonTextRu,
                    description: data[0].descriptionRu,
                    backgroundUrl: data[0].backgroundUrl,
                };
                this.translations.videoCatalog['GEO'] = {
                    title: data[0].titleKa,
                    buttonText: data[0].buttonTextKa,
                    description: data[0].descriptionKa,
                    backgroundUrl: data[0].backgroundUrl,
                };
              }
              console.log(data)
              this.translationsSubject.next(this.translations); // Emit updated translations
              resolve();
            },
            (error) => {
              console.error('Error in fetching marketing banners', error);
              reject(error);
            }
          );
          
        });
    }
      
      
      
  }
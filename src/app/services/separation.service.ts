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

import { GalleryComponentTexts, GalleryComponentTexts as galleryComponentTextsENG } from '../DUMMY_DATA/GALLERY-COMPONENT-DATA/eng';
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
      this.fetchProductsCatalogSlider(savedLanguage);
      this.fetchVoiceComperator(savedLanguage);
      this.fetchColorAndCovers(savedLanguage);
      this.fetchInformationBanners(savedLanguage);
      this.fetchGalleryComponentTexts(savedLanguage);
      this.fetchSaleItems(savedLanguage);
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
              // Store section data including 'id'
              this.translations.mainProducts['ENG'] = {
                title: data.mainProductSections[0].titleEn,
                titleText: data.mainProductSections[0].titleTextEn,
                products: data.products.map(product => ({
                  id: product.id,  // Preserve 'id'
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
                  id: product.id,  // Preserve 'id'
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
                  id: product.id,  // Preserve 'id'
                  title: product.titleKa,
                  description: product.descriptionKa,
                  buttonText: product.buttonTextKa,
                  backgroundUrl: product.backgroundUrl
                }))
              };
            }
    
            // Emit updated translations
            this.translationsSubject.next(this.translations);
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

    fetchProductsCatalogSlider(selectedLanguage: string): Promise<void> {
      return new Promise((resolve, reject) => {
        this.requestService.getProductsCatalogSlider().subscribe(
          (data) => {
            if (data && data.length > 0) {
              this.translations.productsToChoose['ENG'] = data.map((item: any) => ({
                title: item.titleEn,
                backgroundUrl: item.backgroundUrl,
              }));
              this.translations.productsToChoose['RUS'] = data.map((item: any) => ({
                title: item.titleRu,
                backgroundUrl: item.backgroundUrl,
            }));
              this.translations.productsToChoose['GEO'] = data.map((item: any) => ({
                title: item.titleKa,
                backgroundUrl: item.backgroundUrl,
            }));
            }
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

    fetchVoiceComperator(selectedLanguage: string): Promise<void> {
      return new Promise((resolve, reject) => {
        this.requestService.getVoiceComperator().subscribe(
          (data) => {
            if (data && data.length > 0) {
              this.translations.voiceComperator['ENG'] = {
                title: voiceComperatorENG.title,
                buttonW: voiceComperatorENG.buttonW,
                buttonWO: voiceComperatorENG.buttonWO,
                voiceAcupanel: data[0].voiceAcupanel,
                voiceWOAcupanel: data[0].voiceWOAcupanel
              };
              this.translations.voiceComperator['RUS'] = {
                title: voiceComperatorENG.title,
                buttonW: voiceComperatorENG.buttonW,
                buttonWO: voiceComperatorENG.buttonWO,
                voiceAcupanel: data[0].voiceAcupanel,
                voiceWOAcupanel: data[0].voiceWOAcupanel
              };
              this.translations.voiceComperator['GEO'] = {
                title: voiceComperatorENG.title,
                buttonW: voiceComperatorENG.buttonW,
                buttonWO: voiceComperatorENG.buttonWO,
                voiceAcupanel: data[0].voiceAcupanel,
                voiceWOAcupanel: data[0].voiceWOAcupanel
              };;
            }
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

    fetchColorAndCovers(selectedLanguage: string): Promise<void> {
      return new Promise((resolve, reject) => {
        this.requestService.getColorAndCovers().subscribe(
          (data) => {
            this.translations.colorsAndCovers['ENG'] = data.map((item: any, index: number) => ({
              backgroundUrl: item.backgroundUrl,
              title: item.titleEn,
              description: item.descriptionEn,
              buttonText: item.buttonTextEn,
              width: colorsAndCoversENG[index]?.width || "auto", // Fallback to "auto" if index out of range
              height: colorsAndCoversENG[index]?.height || "auto"
            }));
            
            this.translations.colorsAndCovers['RUS'] = data.map((item: any, index: number) => ({
              backgroundUrl: item.backgroundUrl,
              title: item.titleRu,
              description: item.descriptionRu,
              buttonText: item.buttonTextRu,
              width: colorsAndCoversRUS[index]?.width || "auto",
              height: colorsAndCoversRUS[index]?.height || "auto"
            }));
            
            this.translations.colorsAndCovers['GEO'] = data.map((item: any, index: number) => ({
              backgroundUrl: item.backgroundUrl,
              title: item.titleKa,
              description: item.descriptionKa,
              buttonText: item.buttonTextKa,
              width: colorsAndCoversGEO[index]?.width || "auto",
              height: colorsAndCoversGEO[index]?.height || "auto"
            }));
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

    fetchInformationBanners(selectedLanguage: string): Promise<void> {
      return new Promise((resolve, reject) => {
        this.requestService.getInformationBanners().subscribe(
          (data) => {
            this.translations.infoBanners['ENG'] = data.map((item: any, index: number) => ({
              backgroundUrl: item.backgroundUrl,
              title: item.titleEn,
              description: item.descriptionEn,
              buttonText: item.buttonTextEn,
            }));
            
            this.translations.infoBanners['RUS'] = data.map((item: any, index: number) => ({
              backgroundUrl: item.backgroundUrl,
              title: item.titleRu,
              description: item.descriptionRu,
              buttonText: item.buttonTextRu,
            }));
            
            this.translations.infoBanners['GEO'] = data.map((item: any, index: number) => ({
              backgroundUrl: item.backgroundUrl,
              title: item.titleKa,
              description: item.descriptionKa,
              buttonText: item.buttonTextKa,
            }));
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

    fetchGalleryComponentTexts(selectedLanguage: string): Promise<void> {
      return new Promise((resolve, reject) => {
        this.requestService.getGalleryTexts().subscribe(
          (data) => {
            if (data && data.length > 0) {
              this.translations.galleryComponentTexts['ENG'] = {
                title: data[0].titleEn,
                titleText: data[0].titleTextEn,
                words: galleryComponentTextsENG.words
              };
              this.translations.galleryComponentTexts['RUS'] = {
                title: data[0].titleRu,
                titleText: data[0].titleTextRu,
                words: galleryComponentTextsRUS.words
              };
              this.translations.galleryComponentTexts['GEO'] = {
                title: data[0].titleKa,
                titleText: data[0].titleTextKa,
                words: galleryComponentTextsGEO.words
              };
            }
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

    fetchSaleItems(selectedLanguage: string): Promise<void> {
      return new Promise((resolve, reject) => {
        this.requestService.getSaleItems().subscribe(
          (data) => {
            if (data) {
              // Store section data including 'id'
              this.translations.saleItems['ENG'] = {
                title: saleItemsENG.title,
                saleItems: data.map((product: any) => ({
                  title: product.titleEn,
                  description: product.descriptionEn,
                  picture: product.picture
                }))
              };
    
              this.translations.saleItems['RUS'] = {
                title: saleItemsRUS.title,
                saleItems: data.map((product: any) => ({
                  title: product.titleRu,
                  description: product.descriptionRu,
                  picture: product.picture
                }))
              };
    
              this.translations.saleItems['GEO'] = {
                title: saleItemsGEO.title,
                saleItems: data.map((product: any) => ({
                  title: product.titleKa,
                  description: product.descriptionKa,
                  picture: product.picture
                }))
              };
            }
    
            // Emit updated translations
            this.translationsSubject.next(this.translations);
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
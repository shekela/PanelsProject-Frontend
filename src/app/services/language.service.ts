import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Translations } from '../models/translations.model';
import { BackgroundContentModel } from '../models/backgoundcontent.model';
import { ContactInterface } from '../models/contact.model';
import { GalleryComponentTextsInterface } from '../models/gallery-component-texts.model';
import { HeaderInterface } from '../models/headercontent.model';
import { MainProductsInterface } from '../models/mainproducts.model';
import { MarketingBannerData } from '../models/marketingdata.model';
import { MenuInterface } from '../models/menucontent.model';
import { ProductsPageInterface } from '../models/products-page.model';
import { VoiceCompoeratorInterface } from '../models/voice-comperator-model';
import { RequestsService } from './requests.service';
import { SeparationService } from './separation.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('GEO');
  language$ = this.languageSubject.asObservable();

  constructor(private separationService: SeparationService) {
    const savedLanguage = localStorage.getItem('language') || 'GEO';
    this.languageSubject.next(savedLanguage);

    document.documentElement.lang = savedLanguage;
    if (savedLanguage === 'GEO') {
      document.body.style.fontFamily = 'FiraGO, sans-serif';
    } else {
      document.body.style.fontFamily = '';
    }
  }

  // Expose the current language
  getCurrentLanguage(): string {
    return this.languageSubject.value;
  }

  changeLanguage(selectedLanguage: string): void {
    this.languageSubject.next(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
    document.documentElement.lang = selectedLanguage;

    if (selectedLanguage === 'GEO') {
      document.body.style.fontFamily = 'FiraGO, sans-serif';
    } else {
      document.body.style.fontFamily = '';
    }

    this.separationService.fetchMarketingBanners(selectedLanguage);
    this.separationService.fetchMainProducts(selectedLanguage);
    this.separationService.fetchVideoCatalog(selectedLanguage);
  }


  
  // Get translations for the Marketing Banner
  getMarketingBannerTranslation(language: string) {
    return this.separationService.translations.marketingBanner[language] || 
           this.separationService.translations.marketingBanner['GEO'];
  }

  // Get translations for the Main Products
  getMainProductsTranslation(language: string){
    return this.separationService.translations.mainProducts[language] || 
           this.separationService.translations.mainProducts['GEO'];
  }

  getVideoCatalogTranslation(language: string) {
    return this.separationService.translations.videoCatalog[language] || 
    this.separationService.translations.videoCatalog['GEO'];
  }

  getProductsToChooseTranslation(language: string): BackgroundContentModel[] {
    return this.separationService.translations.productsToChoose[language] || this.separationService.translations.productsToChoose['GEO'];
  }

  getColorsAndCoversTranslation(language: string): BackgroundContentModel[] {
    return this.separationService.translations.colorsAndCovers[language] || this.separationService.translations.colorsAndCovers['GEO'];
  }

  getVoiceComperatorTranslation(language: string): VoiceCompoeratorInterface{
    return this.separationService.translations.voiceComperator[language] || this.separationService.translations.voiceComperator['GEO']
  }

  getGalleryComponentsTextsTranslation(language: string): GalleryComponentTextsInterface{
    return this.separationService.translations.galleryComponentTexts[language] || this.separationService.translations.galleryComponentTexts['GEO']
  }

  getInfoBannersTranslation(language: string): BackgroundContentModel[]{
    return this.separationService.translations.infoBanners[language] || this.separationService.translations.infoBanners['GEO']
  }
  getContactTextTranslation(language: string): ContactInterface{
    return this.separationService.translations.contactTextData[language] || this.separationService.translations.contactTextData['GEO']
  }

  getMenuContentTranslation(language: string): MenuInterface{
    return this.separationService.translations.menuParts[language] || this.separationService.translations.menuParts['GEO']
  }

  getHeaderContentTranslation(language: string): HeaderInterface{
    return this.separationService.translations.headerContent[language] || this.separationService.translations.headerContent['GEO']
  }
  getSaleItemsTranslation(language: string): ProductsPageInterface{
    return this.separationService.translations.saleItems[language] || this.separationService.translations.saleItems['GEO']
  }
}

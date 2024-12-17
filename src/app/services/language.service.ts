import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

import { MarketingBannerData } from '../models/marketingdata.model';
import { MainProductsInterface } from '../models/mainproducts.model';
import { BackgroundContentModel } from '../models/backgoundcontent.model';
import { VoiceCompoeratorInterface } from '../models/voice-comperator-model';
import { GalleryComponentTextsInterface } from '../models/gallery-component-texts.model';
import { ContactInterface } from '../models/contact.model';
import { MenuInterface } from '../models/menucontent.model';
import { HeaderInterface } from '../models/headercontent.model';


interface Translations {
  marketingBanner: { [key: string]: MarketingBannerData };
  mainProducts: { [key: string]: MainProductsInterface };
  videoCatalog: {[key: string]: BackgroundContentModel},
  productsToChoose: {[key: string]: BackgroundContentModel[]},
  colorsAndCovers: {[key: string]: BackgroundContentModel[]},
  voiceComperator: {[key: string]: VoiceCompoeratorInterface},
  galleryComponentTexts: {[key: string]: GalleryComponentTextsInterface},
  infoBanners: {[key: string]: BackgroundContentModel[]},
  contactTextData: {[key: string]: ContactInterface},
  menuParts: {[key: string]: MenuInterface},
  headerContent: {[key: string]: HeaderInterface}
  
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('GEO'); // Default language

  language$ = this.languageSubject.asObservable();

  private translations: Translations = {
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
    }
  };

  constructor() {
    const savedLanguage = localStorage.getItem('language') || 'GEO'; 
    this.languageSubject.next(savedLanguage);

    // Apply the language to the <html> tag
    document.documentElement.lang = savedLanguage;

    // Set the font if Georgian
    if (savedLanguage === 'GEO') {
      document.body.style.fontFamily = 'FiraGO, sans-serif';
    } else {
      document.body.style.fontFamily = ''; 
    }
  }

  // Change the language
  changeLanguage(selectedLanguage: string): void {
    this.languageSubject.next(selectedLanguage);
    localStorage.setItem('language', selectedLanguage); // Persist the selected language
    document.documentElement.lang = selectedLanguage; // Set the lang attribute
  }

  // Get translations for the Marketing Banner
  getMarketingBannerTranslation(language: string): MarketingBannerData {
    return this.translations.marketingBanner[language] || this.translations.marketingBanner['GEO'];
  }

  // Get translations for the Main Products
  getMainProductsTranslation(language: string): MainProductsInterface {
    return this.translations.mainProducts[language] || this.translations.mainProducts['GEO'];
  }

  getVideoCatalogTranslation(language: string): BackgroundContentModel {
    return this.translations.videoCatalog[language] || this.translations.videoCatalog['GEO'];
  }

  getProductsToChooseTranslation(language: string): BackgroundContentModel[] {
    return this.translations.productsToChoose[language] || this.translations.productsToChoose['GEO'];
  }

  getColorsAndCoversTranslation(language: string): BackgroundContentModel[] {
    return this.translations.colorsAndCovers[language] || this.translations.colorsAndCovers['GEO'];
  }

  getVoiceComperatorTranslation(language: string): VoiceCompoeratorInterface{
    return this.translations.voiceComperator[language] || this.translations.voiceComperator['GEO']
  }

  getGalleryComponentsTextsTranslation(language: string): GalleryComponentTextsInterface{
    return this.translations.galleryComponentTexts[language] || this.translations.galleryComponentTexts['GEO']
  }

  getInfoBannersTranslation(language: string): BackgroundContentModel[]{
    return this.translations.infoBanners[language] || this.translations.infoBanners['GEO']
  }
  getContactTextTranslation(language: string): ContactInterface{
    return this.translations.contactTextData[language] || this.translations.contactTextData['GEO']
  }

  getMenuContentTranslation(language: string): MenuInterface{
    return this.translations.menuParts[language] || this.translations.menuParts['GEO']
  }

  getHeaderContentTranslation(language: string): HeaderInterface{
    return this.translations.headerContent[language] || this.translations.headerContent['GEO']
  }
}

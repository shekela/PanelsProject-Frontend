import { BackgroundContentModel } from "./backgoundcontent.model";
import { ContactInterface } from "./contact.model";
import { GalleryComponentTextsInterface } from "./gallery-component-texts.model";
import { HeaderInterface } from "./headercontent.model";
import { MainProductsInterface } from "./mainproducts.model";
import { MarketingBannerData } from "./marketingdata.model";
import { MenuInterface } from "./menucontent.model";
import { ProductsPageInterface } from "./products-page.model";
import { VoiceCompoeratorInterface } from "./voice-comperator-model";

export interface Translations {
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
    saleItems: {[key: string]: ProductsPageInterface}
  }
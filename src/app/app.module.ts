import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarketingHeaderComponent } from './marketing-header/marketing-header.component';
import { MainProductsComponent } from './products/main-products/main-products.component';
import { ProductComponent } from './products/product/product.component';
import { VideocatalogComponent } from './videocatalog/videocatalog.component';
import { ProductswitchTemplateComponent } from './shared/productswitch-template/productswitch-template.component';
import { VoiceComperatorComponent } from './voice-comperator/voice-comperator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryComponent } from './gallery/gallery.component';
import { InstagramCatalogComponent } from './gallery/instagram-catalog/instagram-catalog.component';
import { InformationBannerComponent } from './information/information-banner/information-banner.component';
import { InformationBannerReversedComponent } from './information/information-banner-reversed/information-banner-reversed.component';
import { LinebreakPipe } from './pipes/linebreak.pipe';
import { MenuComponent } from './menus/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { InformationComponent } from './information/information/information.component';
import { ContactComponent } from './contact/contact.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ProductsComponent } from './products/products/products.component';
import { MainComponent } from './main/main.component';
import { SaleItemComponent } from './products/sale-item/sale-item.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminMenuComponent } from './menus/admin-menu/admin-menu.component';
import { EditMarketingHeaderComponent } from './edit-content/edit-marketing-header/edit-marketing-header.component';
import { EditMainProductsComponent } from './edit-content/edit-main-products/edit-main-products.component';
import { ModalComponent } from './modal/modal.component';
import { EditVideoCatalogComponent } from './edit-content/edit-video-catalog/edit-video-catalog.component';
import { EditProductCatalogSliderComponent } from './edit-content/edit-product-catalog-slider/edit-product-catalog-slider.component';
import { EditVoiceComperatorComponent } from './edit-content/edit-voice-comperator/edit-voice-comperator.component';
import { EditColorsCoversComponent } from './edit-content/edit-colors-covers/edit-colors-covers.component';
import { EditGalleryComponentComponent } from './edit-content/edit-gallery-component/edit-gallery-component.component';
import { EditInformatiobannerComponentComponent } from './edit-content/edit-informatiobanner-component/edit-informatiobanner-component.component';
import { EditSaleitemsComponentComponent } from './edit-content/edit-saleitems-component/edit-saleitems-component.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OurGalleryComponent } from './our-gallery/our-gallery.component';
import { EditAboutusComponentComponent } from './edit-content/edit-aboutus-component/edit-aboutus-component.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MarketingHeaderComponent,
    MainProductsComponent,
    ProductComponent,
    VideocatalogComponent,
    ProductswitchTemplateComponent,
    VoiceComperatorComponent,
    GalleryComponent,
    InstagramCatalogComponent,
    InformationBannerComponent,
    InformationBannerReversedComponent,
    LinebreakPipe,
    MenuComponent,
    InformationComponent,
    ContactComponent,
    AdminLoginComponent,
    ProductsComponent,
    MainComponent,
    SaleItemComponent,
    AdminPanelComponent,
    AdminMenuComponent,
    EditMarketingHeaderComponent,
    EditMainProductsComponent,
    ModalComponent,
    EditVideoCatalogComponent,
    EditProductCatalogSliderComponent,
    EditVoiceComperatorComponent,
    EditColorsCoversComponent,
    EditGalleryComponentComponent,
    EditInformatiobannerComponentComponent,
    EditSaleitemsComponentComponent,
    AboutUsComponent,
    ContactUsComponent,
    OurGalleryComponent,
    EditAboutusComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

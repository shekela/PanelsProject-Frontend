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
import { FormsModule } from '@angular/forms';
import { GalleryComponent } from './gallery/gallery.component';
import { InstagramCatalogComponent } from './gallery/instagram-catalog/instagram-catalog.component';
import { InformationBannerComponent } from './information/information-banner/information-banner.component';
import { InformationBannerReversedComponent } from './information/information-banner-reversed/information-banner-reversed.component';
import { LinebreakPipe } from './pipes/linebreak.pipe';
import { MenuComponent } from './menu/menu.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

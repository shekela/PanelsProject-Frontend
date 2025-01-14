import { Component, inject, Renderer2 } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';
import { HeaderContent } from '../DUMMY_DATA/HEADERCOMPONENT-CONTENT/geo';
import { CompanyData } from '../DUMMY_DATA/company-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   constructor(private renderer: Renderer2, private languageService: LanguageService){}
   
   private languageSubscription: Subscription | null = null;

   faBars = faBars;
   faX = faXmark;
   faCheck = faCheck;
   
   brandLogo = CompanyData.logo;
   headerContent = HeaderContent;
   isLoaded: boolean = false;

   onOpen() {
    if (this.isLoaded) {
      this.isLoaded = false;
      this.renderer.removeClass(document.body, 'no-scroll');
    } else {
      this.isLoaded = true;
      this.renderer.addClass(document.body, 'no-scroll');
    }
  }

  ngOnInit(): void {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.headerContent = this.languageService.getHeaderContentTranslation(language);
    });
  }
 
   ngOnDestroy(): void {
     this.languageSubscription?.unsubscribe();
   }
   
}

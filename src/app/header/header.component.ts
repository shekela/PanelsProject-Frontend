import { Component, inject, Renderer2 } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataServiceService } from '../services/data-service.service';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';
import { HeaderContent } from '../DUMMY_DATA/HEADERCOMPONENT-CONTENT/geo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   constructor(private renderer: Renderer2, private languageService: LanguageService){}
   

   private dataService = inject(DataServiceService);
   private languageSubscription: Subscription | null = null;

   faBars = faBars;
   faX = faXmark;
   faCheck = faCheck;
   
   brandLogo = this.dataService.brandLogo;
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
    // Subscribe to language changes
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.headerContent = this.languageService.getHeaderContentTranslation(language);
    });
  }
 
   ngOnDestroy(): void {
     // Clean up subscription
     this.languageSubscription?.unsubscribe();
   }
   
}

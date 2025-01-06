import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';
import { DataServiceService } from 'src/app/services/data-service.service';
import { LanguageService } from 'src/app/services/language.service';
import { ProductSwitcherService } from 'src/app/services/product-switcher.service';
import { RequestsService } from 'src/app/services/requests.service';
import { SeparationService } from 'src/app/services/separation.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  private subscription: Subscription | null = null;
  private dataService = inject(DataServiceService);
  colorAndCoversProducts: BackgroundContentModel[] = [];

  isLoaded: boolean = false;
  contentView: string = 'Marketing Banner';

  isPopupOpen = false;
  currentField = '';

  banner: any = {
    TitleEn: '',
    AimEn: '',
    DescriptionEn: '',
    TitleRu: '',
    AimRu: '',
    DescriptionRu: '',
    TitleKa: '',
    AimKa: '',
    DescriptionKa: '',
    ImgUrl: ''
  };


  constructor(
    private renderer: Renderer2, 
    private el: ElementRef, 
    private requestService: RequestsService,
    private productService: ProductSwitcherService, 
    private translate: TranslateService, 
    private languageService: LanguageService, 
    private router: Router, 
    private separationService: SeparationService,
    private http: HttpClient) {}

  onOpen() {
    this.isLoaded = !this.isLoaded;

    if (this.isLoaded) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

 

  // Submit the form and update data in the backend
  

  onSectionSelected(section: string) {
    this.contentView = section;
    this.isLoaded = false; 
    this.renderer.removeClass(document.body, 'no-scroll');
    localStorage.setItem('selectedSection', section);
  }
    
  ngOnInit(): void {
    const storedSection = localStorage.getItem('selectedSection');
    if (storedSection) {
      this.contentView = storedSection;
    }

    this.subscription = this.languageService.language$.subscribe((language) => {
      this.colorAndCoversProducts =
        this.separationService.translations.colorsAndCovers[language] ||
        this.separationService.translations.colorsAndCovers['GEO'];
        this.colorAndCoversProducts = this.colorAndCoversProducts.map(product => {
          if (product.backgroundUrl && !product.backgroundUrl.startsWith('https://localhost:7001')) {
            product.backgroundUrl = 'https://localhost:7001' + product.backgroundUrl;
          }
          return product;
        });
    });
  
    this.subscription.add(
      this.separationService.translations$.subscribe(() => {
        const currentLanguage = this.languageService.getCurrentLanguage();
        this.colorAndCoversProducts =
          this.separationService.translations.colorsAndCovers[currentLanguage] ||
          this.separationService.translations.colorsAndCovers['GEO'];
          this.colorAndCoversProducts = this.colorAndCoversProducts.map(product => {
            if (product.backgroundUrl && !product.backgroundUrl.startsWith('https://localhost:7001')) {
              product.backgroundUrl = 'https://localhost:7001' + product.backgroundUrl;
            }
            return product;
          });
      })
    );
  }
    
  ngAfterViewInit() {
    const marketingHeader = this.el.nativeElement.querySelector('#app-marketing-header');
    if (marketingHeader) {
      this.renderer.addClass(marketingHeader, 'no-margin');
    }
  }

  toggleEditor(): void {
    // Toggle visibility of content and editor sections
    const contentSection = document.getElementById('contentSection');
    const editorSection = document.getElementById('editorSection');
    
    if (contentSection && editorSection) {
      contentSection.style.display = 'none';
      editorSection.style.display = 'block';
      document.body.classList.add('locked'); // Lock scroll on the body
      window.scrollTo(0, 0); // Scroll to the top of the editor section
    }
  }

  scrollToTop(): void {
    // Scroll back to the top (content section)
    const contentSection = document.getElementById('contentSection');
    const editorSection = document.getElementById('editorSection');

    if (contentSection && editorSection) {
      contentSection.style.display = 'block';
      editorSection.style.display = 'none';
      document.body.classList.remove('locked'); // Unlock scroll
    }
  }

  
  resetSection() {
    localStorage.removeItem('selectedSection');
    this.contentView = 'Marketing Banner'; // Reset to default view
  }
}

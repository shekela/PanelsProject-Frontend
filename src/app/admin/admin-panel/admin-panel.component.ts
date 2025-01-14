import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';
import { LanguageService } from 'src/app/services/language.service';
import { SeparationService } from 'src/app/services/separation.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  private subscription: Subscription | null = null;
  colorAndCoversProducts: BackgroundContentModel[] = [];

  isLoaded: boolean = false;
  contentView: string = 'Marketing Banner';

  isPopupOpen = false;
  currentField = '';

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef, 
    private languageService: LanguageService, 
    private separationService: SeparationService) {}

  onOpen() {
    this.isLoaded = !this.isLoaded;
    if (this.isLoaded) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  

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

  toggleEditor(): void {
    const contentSection = document.getElementById('contentSection');
    const editorSection = document.getElementById('editorSection');
    
    if (contentSection && editorSection) {
      contentSection.style.display = 'none';
      editorSection.style.display = 'block';
      document.body.classList.add('locked'); 
      window.scrollTo(0, 0);
    }
  }

  scrollToTop(): void {
    const contentSection = document.getElementById('contentSection');
    const editorSection = document.getElementById('editorSection');

    if (contentSection && editorSection) {
      contentSection.style.display = 'block';
      editorSection.style.display = 'none';
      document.body.classList.remove('locked');
    }
  }

  
  resetSection() {
    localStorage.removeItem('selectedSection');
    this.contentView = 'Marketing Banner'; 
  }
}

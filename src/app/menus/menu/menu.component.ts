import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../services/language.service';
import { MenuParts } from '../../DUMMY_DATA/MENUSECTIONS-DATA/eng';
import { Subscription } from 'rxjs';
import { MenuInterface } from '../../models/menucontent.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  faMinus = faMinus;

  @Input() isLoaded: boolean = false;

  menuContent: MenuInterface = MenuParts; // Initialize with English menu content
  language: string = 'GEO'; // Default language

  private languageSubscription: Subscription | null = null;

  constructor(private languageService: LanguageService, private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Subscribe to language changes
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.language = language;
      this.menuContent = this.languageService.getMenuContentTranslation(language);
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription
    this.languageSubscription?.unsubscribe();
  }

  changeLanguage(selectedLanguage: string): void {
    this.languageService.changeLanguage(selectedLanguage);
  }

  navigateTo(section: string): void {
    switch (section) {
      case 'პროდუქცია':
      case 'Продукты':
      case 'Products':
        this.router.navigate(['/products']);
        this.renderer.removeClass(document.body, 'no-scroll');
        this.isLoaded = false;
        break;

      case 'Gallery':
        this.router.navigate(['/gallery']);
        this.renderer.removeClass(document.body, 'no-scroll');
        this.isLoaded = false;
        break;

      case 'ჩვენს შესახებ':
      case 'О нас':
      case 'About us':
        this.router.navigate(['/about-us']);
        this.renderer.removeClass(document.body, 'no-scroll');
        this.isLoaded = false;
        break;

      case 'დაგვიკავშირდით':
      case 'Свяжитесь с нами':
      case 'Contact us':
        this.router.navigate(['/contact-us']);
        this.renderer.removeClass(document.body, 'no-scroll');
        this.isLoaded = false;
        break;
        
      default:
        console.warn('No route defined for this section:', section);
    }
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../services/language.service';
import { MenuParts } from '../../DUMMY_DATA/MENUSECTIONS-DATA/eng';
import { Subscription } from 'rxjs';
import { MenuInterface } from '../../models/menucontent.model';

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

  constructor(private languageService: LanguageService) {}

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
}

import { Component, inject } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { ContactInterface } from '../models/contact.model';
import { ContactTextData } from '../DUMMY_DATA/CONTACT-COMPONENT/eng';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private dataService = inject(DataServiceService);
  brandLogo = this.dataService.brandLogo;
  private languageSubscription: Subscription | null = null; // Initialize as null

  componentTexts: ContactInterface = ContactTextData;
  
  constructor(private router: Router, private languageService: LanguageService) {}

  
  navigateTo(link: string) {
    window.location.href = link;
  }
  
  ngOnInit(): void {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.componentTexts = this.languageService.getContactTextTranslation(language);
    });
  }
  
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}

import { Component } from '@angular/core';
import { ContactInterface } from '../models/contact.model';
import { ContactTextData } from '../DUMMY_DATA/CONTACT-COMPONENT/eng';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { CompanyData } from '../DUMMY_DATA/company-info';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private languageSubscription: Subscription | null = null; // Initialize as null

  componentTexts: ContactInterface = ContactTextData;
  brandLogo = CompanyData.logo;
  
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
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}

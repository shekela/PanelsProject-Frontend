import { Component } from '@angular/core';
import { CompanyData } from '../DUMMY_DATA/company-info';
import { ContactTextData as ContactTextDataENG} from '../DUMMY_DATA/CONTACT-COMPONENT/eng';
import { ContactTextData as ContactTextDataGEO} from '../DUMMY_DATA/CONTACT-COMPONENT/geo';
import { ContactTextData as ContactTextDataRUS} from '../DUMMY_DATA/CONTACT-COMPONENT/rus';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { ContactInterface } from '../models/contact.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  companyContactTexts!: ContactInterface;
  currentLanguage: string = 'GEO'; 

  private languageSubscription!: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.currentLanguage = language; 
        if(this.currentLanguage === "ENG"){
          this.companyContactTexts = ContactTextDataENG;
        }
        else if(this.currentLanguage === "GEO"){
          this.companyContactTexts = ContactTextDataGEO;
        }
        else if(this.currentLanguage === "RUS"){
          this.companyContactTexts = ContactTextDataRUS;
        }
      }
    );
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
  openChat(event: Event): void {
    event.preventDefault();
    if (window.$crisp) {
        window.$crisp.push(['do', 'chat:open']);
    } else {
        console.error('Crisp is not loaded');
    }
}
}

import { Component, Input } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  faPlus = faPlus;
  faMinus = faMinus;
  @Input() isLoaded: boolean = false;
  
  language = 'ENG';

  changeLanguage(selectedLanguage: string): void {
    this.language = selectedLanguage;
    localStorage.setItem('language', selectedLanguage);
  }
}

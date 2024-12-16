import { Component, Input } from '@angular/core';
import { BackgroundContentModel } from '../models/backgoundcontent.model';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-videocatalog',
  templateUrl: './videocatalog.component.html',
  styleUrls: ['./videocatalog.component.css']
})
export class VideocatalogComponent {
   @Input() videoCatalogData!: BackgroundContentModel;

   constructor(private languageService: LanguageService) {}
   
     ngOnInit(): void {
       this.languageService.language$.subscribe(language => {
         this.videoCatalogData = this.languageService.getVideoCatalogTranslation(language);
       });
     }
}

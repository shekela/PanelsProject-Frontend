import { Component, Input } from '@angular/core';
import { BackgroundContentModel } from '../backgoundcontent.model';
@Component({
  selector: 'app-videocatalog',
  templateUrl: './videocatalog.component.html',
  styleUrls: ['./videocatalog.component.css']
})
export class VideocatalogComponent {
   @Input() videoCatalogData!: BackgroundContentModel;
}

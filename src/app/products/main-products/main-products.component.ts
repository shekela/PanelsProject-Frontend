import { Component, inject, Input } from '@angular/core';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.css']
})
export class MainProductsComponent {
  private dataService = inject(DataServiceService);
  @Input() products: BackgroundContentModel[] = [];
  @Input() width?: string;
  @Input() height?: string;
  @Input() showTitle: boolean = true;

  @Input() title!: string;
  @Input() titleText!: string;

}

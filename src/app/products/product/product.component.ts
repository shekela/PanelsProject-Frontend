import { Component, Input, SimpleChanges } from '@angular/core';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: BackgroundContentModel;

  @Input() width?: string;
  @Input() height?: string;

  ngOnChanges(changes: SimpleChanges): void {
    // Apply defaults on property change
    if (!this.height) {
      this.height = '500px';
    }
    if (!this.width) {
      this.width = '658px';
    }
  }

}

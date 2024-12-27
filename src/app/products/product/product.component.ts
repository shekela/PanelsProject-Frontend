import { Component, Input, SimpleChanges } from '@angular/core';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: BackgroundContentModel;

  @Input() width?: string = '658px';
  @Input() height?: string = '500px';

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.height) {
      this.height = '500px';
    }
    if (!this.width) {
      this.width = '658px';
    }
  }

}

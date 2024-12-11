import { Component, Input } from '@angular/core';
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

  ngOnInit() {
    // Fallback to default height/width if not provided
    if (!this.height) {
      this.height = '500px';
    }
    if (!this.width) {
      this.width = '658px';
    }
  }
}

import { Component, Input } from '@angular/core';
import { BackgroundContentModel } from 'src/app/backgoundcontent.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: BackgroundContentModel;

  @Input() width?: string = "658px";
  @Input() height?: string = "500px";

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

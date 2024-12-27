import { Component, Input } from '@angular/core';
import { SaleItemInterface } from 'src/app/models/sale-item.model';

@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.css']
})
export class SaleItemComponent {
  @Input() product!: SaleItemInterface; 
}

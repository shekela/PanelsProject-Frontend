import { Component, Input } from '@angular/core';
import { MarketingBannerData } from './marketingdata.model';
@Component({
  selector: 'app-marketing-header',
  templateUrl: './marketing-header.component.html',
  styleUrls: ['./marketing-header.component.css']
})
export class MarketingHeaderComponent {
    @Input() marketingData!: MarketingBannerData;
}

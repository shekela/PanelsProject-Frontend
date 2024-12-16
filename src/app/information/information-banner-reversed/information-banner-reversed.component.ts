import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-banner-reversed',
  templateUrl: './information-banner-reversed.component.html',
  styleUrls: ['./information-banner-reversed.component.css']
})
export class InformationBannerReversedComponent {
    @Input({required: true}) title!: string;
    @Input({required: true}) titleText!: string;
    @Input({required: true}) imageUrl!: string;
    @Input({required: true}) buttonText!: string;
}

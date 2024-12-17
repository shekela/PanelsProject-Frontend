import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-banner',
  templateUrl: './information-banner.component.html',
  styleUrls: ['./information-banner.component.css']
})
export class InformationBannerComponent {
    @Input({required: true}) title!: string;
    @Input({required: true}) description?: string | undefined;
    @Input({required: true}) backgroundUrl!: string;
    @Input({required: true}) buttonText?: string;
}

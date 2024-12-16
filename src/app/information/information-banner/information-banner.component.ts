import { Component, Input } from '@angular/core';
import { LinebreakPipe } from 'src/app/pipes/linebreak.pipe';

@Component({
  selector: 'app-information-banner',
  templateUrl: './information-banner.component.html',
  styleUrls: ['./information-banner.component.css']
})
export class InformationBannerComponent {
    @Input({required: true}) title!: string;
    @Input({required: true}) titleText!: string;
    @Input({required: true}) imageUrl!: string;
    @Input({required: true}) buttonText!: string;
}

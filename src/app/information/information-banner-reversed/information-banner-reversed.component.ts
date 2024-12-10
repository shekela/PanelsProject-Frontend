import { Component } from '@angular/core';

@Component({
  selector: 'app-information-banner-reversed',
  templateUrl: './information-banner-reversed.component.html',
  styleUrls: ['./information-banner-reversed.component.css']
})
export class InformationBannerReversedComponent {
    title: string = 'LED lighting for your wall panels';
    text: string = 'Discover how LED can enhance your home with energy-efficient, customizable, and aesthetically pleasing solutions.Create the perfect ambiance with LED and elevate your interior design effortlessly';
    imageUrl: string = 'https://ccfssflq.photoncache.com/wp-content/uploads/2024/08/akupanel-clay-led-denmark-office-2-1-683x1024-1.jpg';
}

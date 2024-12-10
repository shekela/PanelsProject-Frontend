import { Component } from '@angular/core';
import { LinebreakPipe } from 'src/app/pipes/linebreak.pipe';

@Component({
  selector: 'app-information-banner',
  templateUrl: './information-banner.component.html',
  styleUrls: ['./information-banner.component.css']
})
export class InformationBannerComponent {
    title: string = 'LED lighting for your wall panels';
    text: string = 'Discover how LED can enhance your home with energy-efficient, customizable, and aesthetically pleasing solutions.Create the perfect ambiance with LED and elevate your interior design effortlessly';
    imageUrl: string = 'https://ccfssflq.photoncache.com/wp-content/uploads/2024/08/akupanel-clay-led-denmark-office-2-1-683x1024-1.jpg';
}

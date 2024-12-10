import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GalleryObjectModel } from 'src/app/models/gallery-objects.model';

@Component({
  selector: 'app-instagram-catalog',
  templateUrl: './instagram-catalog.component.html',
  styleUrls: ['./instagram-catalog.component.css']
})
export class InstagramCatalogComponent {

  @Input() instagramPageName!: string;

  
  @Output() close = new EventEmitter();
  @Output() changeToRight = new EventEmitter();
  @Output() changeToLeft = new EventEmitter();

  @Input() pictureMain?: GalleryObjectModel;
  @Input() pictureLeft!: GalleryObjectModel;
  @Input() pictureRight!: GalleryObjectModel;


  @ViewChild('mainVideo', { static: false }) mainVideoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('leftVideo', { static: false }) leftVideoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('rightVideo', { static: false }) rightVideoElement!: ElementRef<HTMLVideoElement>;

  closeFeed() {
    this.close.emit();
  }

  onChangeToRight() {
    this.changeToRight.emit();
  }

  onChangeToLeft() {
    this.changeToLeft.emit();
  }

  ngAfterViewChecked(): void {
    this.applyVideoSettings(this.mainVideoElement);
    this.applyVideoSettings(this.leftVideoElement);
    this.applyVideoSettings(this.rightVideoElement);
  }

  private applyVideoSettings(videoElement: ElementRef<HTMLVideoElement> | undefined) {
    if (videoElement) {
      const video = videoElement.nativeElement;
      video.muted = true; // Enable sound
      video.volume = 0; // Set to full volume
      console.log('Applied settings for video:', video.src);
    }
  }
  
}

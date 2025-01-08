import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent {
  @Input() isLoaded: boolean = false;
  @Output() sectionSelected = new EventEmitter<string>();

  menuContent = [
    "Marketing Banner",
    "Main Products",
    "Video Catalog",
    "Products Catalog Slider",
    "Voice Comperator",
    "Colors and Covers",
    "Gallery",
    "Information Banners",
    "Sale Items",
    "About Us"
  ];

  onSelectSection(section: string) {
    this.sectionSelected.emit(section);
  }
}

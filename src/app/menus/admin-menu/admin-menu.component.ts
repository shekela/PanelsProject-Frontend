import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent {
  constructor(private router: Router){}
  
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
    "About Us",
  ];

  onSelectSection(section: string) {
    this.sectionSelected.emit(section);
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove the token from localStorage
    this.router.navigate(['/admin/login']); // Redirect to the login page
  }
}

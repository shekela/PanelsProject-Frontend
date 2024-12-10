import { Component, inject } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   private dataService = inject(DataServiceService);

   faBars = faBars;
   faCheck = faCheck;

   brandLogo = this.dataService.brandLogo;

   
}

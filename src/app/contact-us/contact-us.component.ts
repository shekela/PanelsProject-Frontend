import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  openChat(event: Event): void {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    if (window.$crisp) {
        window.$crisp.push(['do', 'chat:open']);
    } else {
        console.error('Crisp is not loaded');
    }
}
}

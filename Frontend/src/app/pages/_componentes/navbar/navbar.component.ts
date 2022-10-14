import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   @Output() toggleButton = new EventEmitter();

   constructor() { }

   ngOnInit(): void {
   }

   toggle() {
      this.toggleButton.emit();
   }

}

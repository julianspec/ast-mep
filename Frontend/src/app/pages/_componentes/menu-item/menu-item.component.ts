import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { MenuItem } from 'src/app/_model';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
      trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
         animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuItemComponent implements OnInit {
   expanded: boolean = false;
   status: boolean = false;
   @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
   @Input() item: MenuItem;
   @Input() depth: number;

   constructor(public router: Router) {
      if (this.depth === undefined) {
         this.depth = 0;
      }
   }
   ngOnInit(): void {

   }

   onItemSelected(item: MenuItem) {
      if (!item.subMenu || !item.subMenu.length) {
         this.status = !this.status;
         this.router.navigate([item.ruta]);
         //this.navService.closeNav();
      }
      if (item.subMenu && item.subMenu.length) {
         this.status = !this.status;
         this.expanded = !this.expanded;
      }
    }

}

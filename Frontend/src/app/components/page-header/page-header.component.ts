import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-page-header',
	templateUrl: './page-header.component.html',
	styleUrls: ['./page-header.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PageHeaderComponent {

	@Input() title: string;
	@Input() subtitle: string;

	constructor(public router: Router) { }
}

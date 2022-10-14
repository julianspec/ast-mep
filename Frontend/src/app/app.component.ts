import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	showInitLoad: boolean = true;
	delaySubscription = new Subscription();

	constructor(public translate: TranslateService) {
		this.translate.use('es-AR');
	}

	onRouterOutletActivate(event: any) {
		this.showInitLoad = false;
	}
}

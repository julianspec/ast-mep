import { Component, ViewEncapsulation } from '@angular/core';
import { UwErrorConfig } from '@accusys/uw-core-service-model';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
	selector: 'app-error-cmp',
	templateUrl: './error-cmp.component.html',
	styleUrls: ['./error-cmp.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ErrorCmpComponent {
	params: UwErrorConfig = new UwErrorConfig();
	constructor(private oauthService: OAuthService) {}

	onButtonClick(data: UwErrorConfig) {
		sessionStorage.clear();
		this.oauthService.refreshToken();
		window.open(data.buttonHref, data.buttonTarget);
	}
}

import { UwErrorConfig } from '@accusys/uw-core-service-model';
import { Component, ViewEncapsulation } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-not-access-app',
	templateUrl: './not-access-app.component.html',
	styleUrls: ['./not-access-app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NotAccessAppComponent {
	params: UwErrorConfig = new UwErrorConfig();
	constructor(private oauthService: OAuthService) {}

	ngAfterViewChecked(): void {}

	onButtonClick(data: UwErrorConfig) {
		sessionStorage.clear();
		this.oauthService.refreshToken();
		window.open(data.buttonHref, data.buttonTarget);
	}

	onCloseSession() {
		sessionStorage.removeItem('user');
		this.oauthService.logOut();
		this.reloadWindow();
	}

	private reloadWindow() {
		location.reload();
		window.location.href = environment.sso.serverUrl + '/oidc/logout';
	}
}

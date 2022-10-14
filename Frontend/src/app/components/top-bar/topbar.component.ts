import { Component, ViewEncapsulation, EventEmitter, Output, Input } from '@angular/core';
import { UwTopBarConfigModel, UwTopBarAccesibleAppsModel } from '@accusys/uw-core-components';
import { Router } from '@angular/router';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TopbarComponent {
	configTopBar: UwTopBarConfigModel = {
		isMovile: false,
		showMenuButton: true,
		showMenuLogo: true,
		showAppListButton: true,
		showAppConfigButton: false,
		showNotificationsButton: true,
		showLastConectionInfo: true,
		notificationInterval: 5000, //This parameter works only when enviroment porperty 'enableGetNotificationInterval' is true;
		spinnerStyle: 1,
		textLogo: 'MEP',
		imgLogo: 'uniweb-logo.svg',
		user: '----',
		languages: [
			{
				name: 'Español',
				shortName: 'AR',
				i18n: 'es-AR'
			},
			{
				name: 'Ingles EEUU',
				shortName: 'US',
				i18n: 'en-US'
			}
		]
	};

	appsList: Array<UwTopBarAccesibleAppsModel> = [];

	constructor(public router: Router) { }

	//NOTE: for change fist init state change in root.component.ts => menuActive
	openMenu: boolean;
	@Input('showMenu') set inputShowMenu(value: boolean) {
		this.openMenu = value;
	}

	@Output('onClickMenu')
	_onClickMenu = new EventEmitter<boolean>();
	clickMenu() {
		//console.info('xTopMenuActive: ', this.openMenu);
		this._onClickMenu.emit(this.openMenu);
	}

	closeSession(e) {
		//console.info('Close session', e);
		sessionStorage.clear();
	}

	clickNotification(e) {
		//console.info('Click Notification', e);
	}

	clickOpenUWApps(e) {
		//console.info('Click Uniweb 2 Apps List', e);
	}

	clickOpenAppsConfig(e) {
		//console.info('Click Uniweb 2 App Config', e);
	}

	clickLogo(e) {
		this.router.navigate(['/home']);
		//console.info('Click Logo', e);
	}
}

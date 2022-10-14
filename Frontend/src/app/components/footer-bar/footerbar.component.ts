import { Component, ViewEncapsulation } from '@angular/core';
import { UwFooterBarConfig } from '@accusys/uw-core-components';

import { version } from '../../../../package.json';

@Component({
	selector: 'app-footerbar',
	templateUrl: './footerbar.component.html',
	styleUrls: ['./footerbar.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class FooterbarComponent {
	configFooterBar: UwFooterBarConfig = {
		name: 'Uniweb seed',
		version: version
	};

	constructor() {}
}

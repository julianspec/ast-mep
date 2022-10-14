import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'uw-refresh-button',
	templateUrl: './uw-refresh-button.component.html',
	styleUrls: ['./uw-refresh-button.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class UwRefreshButtonComponent {
	@Input() loading: boolean;

	@Input() matTooltip: boolean;

	@Input('radius')
	radius: string = '50px';

	@Output('onClick')
	_click = new EventEmitter<boolean>();
	onClick(e) {
		this._click.emit(e);
	}

	constructor() {}
}

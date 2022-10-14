import { Component, Input } from '@angular/core';
import { UwServiceErrorViewer } from './uw-service-error-viewer.model';

@Component({
	selector: 'uw-service-error-viewer',
	templateUrl: './uw-service-error-viewer.component.html',
	styleUrls: ['./uw-service-error-viewer.component.scss']
})
export class UwServiceErrorViewerComponent {
	@Input() error: UwServiceErrorViewer;

	constructor() {}
}

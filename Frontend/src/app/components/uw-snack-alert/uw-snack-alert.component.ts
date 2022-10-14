import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export enum UwSnackAlertEnumType {
	SNACK_ERROR,
	SNACK_SUCCESS
}

@Component({
	selector: 'uw-snack-alert',
	templateUrl: './uw-snack-alert.component.html',
	styleUrls: ['./uw-snack-alert.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class UwSnackAlertComponent {
	constructor(public snackBarRef: MatSnackBarRef<UwSnackAlertComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}

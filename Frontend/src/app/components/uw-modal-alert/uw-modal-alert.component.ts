import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class UwModalAlertConfig {
	header: string;
	message: string;

	buttonSuccessText?: string = 'Aceptar';
	buttonCancelText?: string = 'Cancelar';

	visibleButtonSuccess?: boolean = true;
	visibleButtonCancel?: boolean = false;

	public constructor(init?: Partial<UwModalAlertConfig>) {
		Object.assign(this, init);
	}
}

@Component({
	selector: 'uw-modal-alert',
	templateUrl: './uw-modal-alert.component.html',
	styleUrls: ['./uw-modal-alert.component.scss']
})
export class UwModalAlertComponent {
	dialogData: UwModalAlertConfig = new UwModalAlertConfig();
	constructor(public dialogRef: MatDialogRef<UwModalAlertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
		this.dataInitialization(data);
	}

	dataInitialization(data: UwModalAlertConfig) {
		if (data) {
			if (data.message) {
				this.dialogData.message = data.message;
			}
			if (data.header) {
				this.dialogData.header = data.header;
			}

			if (data.buttonCancelText) {
				this.dialogData.buttonCancelText = data.buttonCancelText;
			}
			if (data.buttonSuccessText) {
				this.dialogData.buttonSuccessText = data.buttonSuccessText;
			}
			if (data.visibleButtonCancel != undefined) {
				this.dialogData.visibleButtonCancel = data.visibleButtonCancel;
			}
			if (data.visibleButtonSuccess != undefined) {
				this.dialogData.visibleButtonSuccess = data.visibleButtonSuccess;
			}
		} else {
			console.error('NO DATA INJECTED');
			console.error(this.dialogData);
		}
	}
}

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UwModalAlertComponent, UwModalAlertConfig } from './uw-modal-alert.component';

const data: UwModalAlertConfig = {
	header: 'header text',
	message: 'message text',
	buttonSuccessText: 'Aceptar',
	buttonCancelText: 'Cancelar',
	visibleButtonSuccess: true,
	visibleButtonCancel: false
};

describe('UwModalAlertComponent', () => {
	let component: UwModalAlertComponent;
	let fixture: ComponentFixture<UwModalAlertComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [MatDialogModule],
			declarations: [UwModalAlertComponent],
			providers: [
				{ provide: MAT_DIALOG_DATA, useValue: data },
				{ provide: MatDialogRef, useValue: {} }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UwModalAlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show console error if no data', () => {
		spyOn(console, 'error');
		component.dataInitialization(null);
		expect(console.error).toHaveBeenCalledTimes(2);
	});

	it('should inicializated data correctly', () => {
		component.dataInitialization({
			header: '-',
			message: '-',
			buttonSuccessText: '-',
			buttonCancelText: '-',
			visibleButtonSuccess: true,
			visibleButtonCancel: true
		});
		expect(component.dialogData.header).toEqual('-');
		expect(component.dialogData.message).toEqual('-');
		expect(component.dialogData.buttonSuccessText).toEqual('-');
		expect(component.dialogData.buttonCancelText).toEqual('-');
		expect(component.dialogData.visibleButtonSuccess).toBeTrue();
		expect(component.dialogData.visibleButtonCancel).toBeTrue();
	});

	it('should inicializated data correctly with false', () => {
		component.dataInitialization({
			header: '-',
			message: '-',
			visibleButtonSuccess: false,
			visibleButtonCancel: false
		});

		expect(component.dialogData.visibleButtonSuccess).toBeFalse();
		expect(component.dialogData.visibleButtonCancel).toBeFalse();
	});
});

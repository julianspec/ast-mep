import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { UwSnackAlertComponent } from './uw-snack-alert.component';

describe('UwSnackAlertComponent', () => {
	let component: UwSnackAlertComponent;
	let fixture: ComponentFixture<UwSnackAlertComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [MatSnackBarModule],
			declarations: [UwSnackAlertComponent],
			providers: [
				{ provide: MAT_SNACK_BAR_DATA, useValue: {} },
				{ provide: MatSnackBarRef, useValue: {} }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UwSnackAlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

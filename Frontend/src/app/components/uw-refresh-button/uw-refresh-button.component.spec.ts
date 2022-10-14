import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UwRefreshButtonComponent } from './uw-refresh-button.component';

describe('UwRefreshButtonComponent', () => {
	let component: UwRefreshButtonComponent;
	let fixture: ComponentFixture<UwRefreshButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			declarations: [UwRefreshButtonComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UwRefreshButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('button should have click event binding', fakeAsync(() => {
		spyOn(component, 'onClick');
		let btn = fixture.debugElement.query(By.css('button'));
		btn.triggerEventHandler('click', null);
		tick();
		fixture.detectChanges();
		expect(component.onClick).toHaveBeenCalled();
	}));

	it('should call click event', fakeAsync(() => {
		spyOn(component._click, 'emit');
		component.onClick(null);
		expect(component._click.emit).toHaveBeenCalled();
	}));
});

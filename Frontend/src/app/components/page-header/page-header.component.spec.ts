import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
	let component: PageHeaderComponent;
	let fixture: ComponentFixture<PageHeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [RouterModule.forRoot([])],
			declarations: [PageHeaderComponent],
			providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PageHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

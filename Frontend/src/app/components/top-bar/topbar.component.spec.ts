import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { TopbarComponent } from './topbar.component';

describe('TopbarComponent', () => {
	let component: TopbarComponent;
	let fixture: ComponentFixture<TopbarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [RouterModule.forRoot([])],
			declarations: [TopbarComponent],
			providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TopbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

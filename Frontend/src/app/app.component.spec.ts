import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';
import { ifStmt } from '@angular/compiler/src/output/output_ast';

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [RouterTestingModule, AppModule],
			declarations: [AppComponent],
			providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('Inicialized AppComponent', () => {
		it('It should create the app', () => {
			expect(component).toBeTruthy();
		});
	});

	describe('Check HTML in AppComponent', () => {
		it('Should have a router oulet', () => {
			const element = fixture.debugElement.query(By.directive(RouterOutlet));
			expect(element).not.toBeNull();
		});

		it('Router Oulet Should have activate event, and when event trigger set ShowInitLoad to false', () => {
			component.showInitLoad = true;
			const element = fixture.debugElement.query(By.directive(RouterOutlet));
			element.triggerEventHandler('activate', {});
			expect(component.showInitLoad).toBeFalse();
		});

		it('Should have a spinner loading', () => {
			fixture.detectChanges();
			const spinner = fixture.nativeElement.querySelector('mat-spinner');
			expect(spinner).not.toBeNull();
		});
	});

	describe('After RouterOulet Activate', () => {
		it('Should hide loader spinner', () => {
			component.onRouterOutletActivate(null);
			expect(component.showInitLoad).toBeFalse();
		});
	});
});

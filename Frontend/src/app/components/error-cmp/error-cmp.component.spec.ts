import { UwCoreComponentsModule } from '@accusys/uw-core-components';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';

import { ErrorCmpComponent } from './error-cmp.component';

const mockParams = {
	title: {
		text: 'No autorizado',
		i18nText: 'UwCORE.APPACCESSGUARD.title'
	},
	code: {
		text: '403'
	},
	info: {
		text: 'No tienes permiso para ingresar a este recurso/ruta',
		i18nText: 'UwCORE.APPACCESSGUARD.info'
	},
	buttonText: {
		text: 'TEST'
	},
	buttonHref: 'http://localhost:5000/errorCmp',
	buttonTarget: '_self',
	path: '----path----',
	showCode: true,
	showInfo: true,
	showPath: true,
	showTitle: true,
	showButton: true
};

class OAuthServiceStub {
	public refreshToken() {
		return null;
	}
}

describe('ErrorCmpComponent', () => {
	let component: ErrorCmpComponent;
	let fixture: ComponentFixture<ErrorCmpComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			imports: [RouterModule.forRoot([]), HttpClientModule, OAuthModule.forRoot(), UwCoreComponentsModule],
			declarations: [ErrorCmpComponent],
			providers: [{ provide: OAuthService, useClass: OAuthServiceStub }]
		}).overrideComponent(ErrorCmpComponent, {
			set: { template: '' }
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ErrorCmpComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have onButtonClick event', () => {
		spyOn(window, 'open');
		spyOn(sessionStorage, 'clear');
		spyOn((<any>component).oauthService, 'refreshToken');

		component.onButtonClick(mockParams);

		expect(sessionStorage.clear).toHaveBeenCalled();
		expect((<any>component).oauthService.refreshToken).toHaveBeenCalled();
		expect(window.open).toHaveBeenCalled();
	});
});

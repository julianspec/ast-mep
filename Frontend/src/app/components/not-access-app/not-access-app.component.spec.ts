import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';

import { NotAccessAppComponent } from './not-access-app.component';

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

	public logOut() {
		return null;
	}
}

describe('NotAccessAppComponent', () => {
	let component: NotAccessAppComponent;
	let fixture: ComponentFixture<NotAccessAppComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [OAuthModule.forRoot(), HttpClientModule, TranslateModule.forRoot()],
			declarations: [NotAccessAppComponent],
			providers: [{ provide: OAuthService, useClass: OAuthServiceStub }]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NotAccessAppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should clear sesion on onButtonClick event', () => {
		spyOn(window, 'open');
		spyOn(sessionStorage, 'clear');
		spyOn((<any>component).oauthService, 'refreshToken');

		component.onButtonClick(mockParams);

		expect(sessionStorage.clear).toHaveBeenCalled();
		expect((<any>component).oauthService.refreshToken).toHaveBeenCalled();
		expect(window.open).toHaveBeenCalled();
	});

	it('should close sesion on onCloseSession event', () => {
		spyOn(component as any, 'reloadWindow');
		spyOn(sessionStorage, 'removeItem');
		spyOn((<any>component).oauthService, 'logOut');

		component.onCloseSession();

		expect((<any>component).oauthService.logOut).toHaveBeenCalled();
		expect(sessionStorage.removeItem).toHaveBeenCalled();
	});
});

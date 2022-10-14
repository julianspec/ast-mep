import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/@modules/UW_translatelocalization.module';

import { UwCurrencyComponent } from './uw-currency.component';

describe('UwCurrencyComponent', () => {
	let component: UwCurrencyComponent;
	let fixture: ComponentFixture<UwCurrencyComponent>;

	beforeEach(async(() => {
		//prettier-ignore
		TestBed.configureTestingModule({
			schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
			imports: [
				HttpClientModule,
				TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] } })
			],
			declarations: [UwCurrencyComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UwCurrencyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

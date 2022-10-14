import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { MAT_DATE_LOCALE } from '@angular/material/core';
registerLocaleData(localeEsAr, 'es-AR');

@NgModule({
	declarations: [],
	//prettier-ignore
	imports: [
		CommonModule
	],
	//prettier-ignore
	exports: [ 
		TranslateModule
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-AR' },
		{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' }
	]
})
export class UwTranslateLocalizationModule {}

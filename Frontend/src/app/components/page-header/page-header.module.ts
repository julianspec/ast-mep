import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UwTranslateLocalizationModule } from 'src/app/@modules/UW_translatelocalization.module';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
	// prettier-ignore
	declarations: [
		PageHeaderComponent,
	],
	// prettier-ignore
	exports: [
		PageHeaderComponent,
	],
	// prettier-ignore
	imports: [
		CommonModule,
		UwTranslateLocalizationModule
	],
	providers: [],
	bootstrap: []
})
export class PageHeaderComponentModule { }

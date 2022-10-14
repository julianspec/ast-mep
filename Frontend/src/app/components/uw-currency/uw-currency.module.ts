import { UwSpinnerModule } from '@accusys/uw-core-components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UwMaterialModule } from 'src/app/@modules/UW_material.module';
import { UwCurrencyComponent } from './uw-currency.component';

@NgModule({
	declarations: [UwCurrencyComponent],
	exports: [UwCurrencyComponent],
	//prettier-ignore
	imports: [
		CommonModule, 
		UwMaterialModule,
		UwSpinnerModule,
		TranslateModule,
	]
})
export class UwCurrencyModule {}

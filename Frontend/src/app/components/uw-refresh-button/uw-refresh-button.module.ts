import { UwSpinnerModule } from '@accusys/uw-core-components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UwMaterialModule } from 'src/app/@modules/UW_material.module';
import { UwRefreshButtonComponent } from './uw-refresh-button.component';

@NgModule({
	declarations: [UwRefreshButtonComponent],
	exports: [UwRefreshButtonComponent],
	//prettier-ignore
	imports: [
		CommonModule, 
		UwMaterialModule,
		UwSpinnerModule
	]
})
export class UwRefreshButtonModule {}

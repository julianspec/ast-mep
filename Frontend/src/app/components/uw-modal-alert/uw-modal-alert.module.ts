import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UwMaterialModule } from 'src/app/@modules/UW_material.module';
import { UwModalAlertComponent } from './uw-modal-alert.component';

@NgModule({
	declarations: [UwModalAlertComponent],
	exports: [UwModalAlertComponent],
	//prettier-ignore
	imports: [
		CommonModule, 
		UwMaterialModule
	]
})
export class UwModalAlertModule {}

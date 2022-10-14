import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UwMaterialModule } from 'src/app/@modules/UW_material.module';
import { UwSnackAlertComponent } from './uw-snack-alert.component';

@NgModule({
	declarations: [UwSnackAlertComponent],
	exports: [UwSnackAlertComponent],
	//prettier-ignore
	imports: [
		CommonModule, 
		UwMaterialModule
	]
})
export class UwSnackAlertModule {}

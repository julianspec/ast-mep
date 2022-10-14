import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material Form Controls
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
	declarations: [],
	//prettier-ignore
	imports: [
		CommonModule,
		NgxMatDatetimePickerModule,
		NgxMatTimepickerModule,
		NgxMatNativeDateModule,
		NgxMatMomentModule,

		MatSelectInfiniteScrollModule,
		MaterialFileInputModule
	],
	//prettier-ignore
	exports: [
		NgxMatDatetimePickerModule,
		NgxMatTimepickerModule,
		NgxMatNativeDateModule,
		NgxMatMomentModule,
		
		MatSelectInfiniteScrollModule,
		MaterialFileInputModule
	]
})
export class UwOtherLibsModule {}

import { UwSpinnerModule } from '@accusys/uw-core-components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UwMaterialModule } from 'src/app/@modules/UW_material.module';
import { UwServiceErrorViewerComponent } from './uw-service-error-viewer.component';

@NgModule({
	declarations: [UwServiceErrorViewerComponent],
	exports: [UwServiceErrorViewerComponent],
	//prettier-ignore
	imports: [
		CommonModule, 
		UwMaterialModule,
		UwSpinnerModule,
		TranslateModule,
	]
})
export class UwServiceErrorViewerModule {}

import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { UwAppModule } from '../@modules/UW_app.module';
import { UwMaterialModule } from '../@modules/UW_material.module';
import { UwOtherLibsModule } from '../@modules/UW_otherlibs.module';
import { UwTranslateLocalizationModule } from '../@modules/UW_translatelocalization.module';
import { UwModalAlertModule } from '../components/uw-modal-alert/uw-modal-alert.module';
import { UwSnackAlertModule } from '../components/uw-snack-alert/uw-snack-alert.module';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { ExampleFormValidationsComponent } from './example-form-validations/example-form-validations.component';
import { ExampleFormComponent } from './example-form/example-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TaskComponent } from './task/task.component';
import { AbmComponent } from './abm/abm.component';
import { PosicionComponent } from './posicion/posicion.component';


@NgModule({
	// prettier-ignore
	declarations: [
		HomePageComponent,
		ExampleFormComponent,
		ExampleFormValidationsComponent,
		TaskComponent,
		PageHeaderComponent,
		AbmComponent,
		PosicionComponent
	],
	// prettier-ignore
	exports: [
		HomePageComponent,
		ExampleFormComponent,
		ExampleFormValidationsComponent

	],
	// prettier-ignore
	imports: [

		CommonModule,

		UwOtherLibsModule,
		UwTranslateLocalizationModule,
		UwMaterialModule,
		UwAppModule,
		UwModalAlertModule,
		UwSnackAlertModule

	],
	providers: [],
	bootstrap: []
})
export class AppPagesModule { }

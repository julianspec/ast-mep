import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UwAppModule } from '../@modules/UW_app.module';
import { UwMaterialModule } from '../@modules/UW_material.module';
import { UwOtherLibsModule } from '../@modules/UW_otherlibs.module';
import { UwTranslateLocalizationModule } from '../@modules/UW_translatelocalization.module';

import { ErrorCmpComponent } from './error-cmp/error-cmp.component';

import { FooterbarComponent } from './footer-bar/footerbar.component';
import { LoadingComponent } from './loading/loading.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MenuItemComponent } from './main-menu/menu-item/menu-item.component';
import { UwModalAlertModule } from './uw-modal-alert/uw-modal-alert.module';
import { TopbarComponent } from './top-bar/topbar.component';
import { UwSnackAlertModule } from './uw-snack-alert/uw-snack-alert.module';
import { NotAccessAppComponent } from './not-access-app/not-access-app.component';
import { UwRefreshButtonModule } from './uw-refresh-button/uw-refresh-button.module';
import { UwServiceErrorViewerModule } from './uw-service-error-viewer/uw-service-error-viewer.module';
import { UwCurrencyModule } from './uw-currency/uw-currency.module';

@NgModule({
	// prettier-ignore
	declarations: [
		ErrorCmpComponent,
		FooterbarComponent,
		LoadingComponent,
		MainMenuComponent,
		MenuItemComponent,
		TopbarComponent,
		NotAccessAppComponent
		
	],
	// prettier-ignore
	exports:[
		ErrorCmpComponent,
		FooterbarComponent,
		LoadingComponent,
		MainMenuComponent,
		MenuItemComponent,
		TopbarComponent,
		NotAccessAppComponent,

		//TODO:Move to Libraries
		UwRefreshButtonModule,
		UwModalAlertModule,
		UwSnackAlertModule,
		UwCurrencyModule,
		UwServiceErrorViewerModule
		
	],
	// prettier-ignore
	imports: [
		CommonModule,

		//TODO:Move to Libraries
		UwRefreshButtonModule,
		UwModalAlertModule,
		UwSnackAlertModule,
		UwCurrencyModule,
		UwServiceErrorViewerModule,

		//BaseLibs
		UwOtherLibsModule,
		UwTranslateLocalizationModule,
		UwMaterialModule,
		UwAppModule,

	],
	providers: [],
	bootstrap: []
})
export class AppComponentsModule {}

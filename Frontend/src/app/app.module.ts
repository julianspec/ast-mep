import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { UwOtherLibsModule } from './@modules/UW_otherlibs.module';
import { UwAppModule } from './@modules/UW_app.module';
import { UwTranslateLocalizationModule, HttpLoaderFactory } from './@modules/UW_translatelocalization.module';
import { UwMaterialModule } from './@modules/UW_material.module';

import { UwCoreComponentsModule } from '@accusys/uw-core-components';
import { UwCoreServiceModelModule } from '@accusys/uw-core-service-model';
import { UwCoreLibAuthenticationModule } from '@accusys/uw-core-authentication';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { HttpClient } from '@angular/common/http';
import { AppPagesModule } from './pages/pages.module';
import { RootComponent } from './pages/root/root.component';
import { AppComponentsModule } from './components/components.module';

@NgModule({
	declarations: [AppComponent, RootComponent],
	imports: [
		UwOtherLibsModule,
		UwTranslateLocalizationModule,
		UwMaterialModule,
		UwAppModule,

		AppRoutingModule,
		AppComponentsModule,
		AppPagesModule,

		TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] } }),
		UwCoreComponentsModule.forRoot(environment),
		UwCoreServiceModelModule.forRoot(environment),
		UwCoreLibAuthenticationModule.forRoot(environment)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}

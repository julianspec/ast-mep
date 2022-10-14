import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UwCoreComponentsModule } from '@accusys/uw-core-components';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { OAuthModule } from 'angular-oauth2-oidc';
import { UwCoreServiceModelModule } from '@accusys/uw-core-service-model';
import { UwCoreLibAuthenticationModule, UwHttpInterceptor } from '@accusys/uw-core-authentication';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [],
	//prettier-ignore
	imports: [
		CommonModule,
		RouterModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
	
		

		UwCoreComponentsModule,
		UwCoreLibAuthenticationModule,
		UwCoreServiceModelModule,
		OAuthModule.forRoot()
	],
	//prettier-ignore
	exports: [ 
		RouterModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,

		
		
		UwCoreComponentsModule,
		UwCoreLibAuthenticationModule,
		UwCoreServiceModelModule,
	],
	//prettier-ignore
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: UwHttpInterceptor, multi: true }
	]
})
export class UwAppModule {}

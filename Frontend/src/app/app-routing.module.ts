import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { UwWso2LoginComponent, UwSessionWSO2Guard, UwSessionWSO2ChildGuard, UwAppAccessGuard, UwAppAccessChildGuard, UwRoleGuard } from '@accusys/uw-core-authentication';
import { RootComponent } from './pages/root/root.component';
import { NotAccessAppComponent } from './components/not-access-app/not-access-app.component';
import { ErrorCmpComponent } from './components/error-cmp/error-cmp.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExampleFormComponent } from './pages/example-form/example-form.component';
import { ExampleFormValidationsComponent } from './pages/example-form-validations/example-form-validations.component';
import { TaskComponent } from './pages/task/task.component';
import { environment } from 'src/environments/environment';
import { AbmComponent } from './pages/abm/abm.component';
import { PosicionComponent } from './pages/posicion/posicion.component';
import { ReservaEfectivoComponent } from './pages/reserva-efectivo/reserva-efectivo.component';

const appNameAccess = environment.appName; //TODO: Cambiar por el nombre que se le dio de alta en uniweb

export const routes: Routes = [
	{ path: 'login', component: UwWso2LoginComponent, data: { appName: appNameAccess } },
	{ path: 'not-access-app', component: NotAccessAppComponent, data: { appName: appNameAccess } },
	{ path: '', redirectTo: '/root/home', pathMatch: 'full' },
	{
		path: 'root',
		component: RootComponent,
		canActivate: [UwSessionWSO2Guard, UwAppAccessGuard],
		canActivateChild: [UwSessionWSO2ChildGuard, UwAppAccessChildGuard],
		data: { appName: appNameAccess },
		children: [
			{ path: 'error', component: ErrorCmpComponent, data: { appName: appNameAccess } },
			{ path: 'home', component: HomePageComponent, data: { appName: appNameAccess } },
			{ path: 'posicion', component: PosicionComponent, data: { appName: appNameAccess } },
			{ path: 'reserva-efectivo', component: ReservaEfectivoComponent, data: { appName: appNameAccess } },
			{ path: 'example-form', component: ExampleFormComponent, data: { appName: appNameAccess } },
			{ path: 'example-form-validations', component: ExampleFormValidationsComponent, data: { appName: appNameAccess } },
			{ path: 'do-task/:id', component: TaskComponent, data: { appName: appNameAccess } },
		]
	}
];

//TODO: Implementar una estrategia de lazyload, o similar
const RoutingOptions: ExtraOptions = { anchorScrolling: 'enabled', useHash: false, scrollPositionRestoration: 'top' };

@NgModule({
	imports: [RouterModule.forRoot(routes, RoutingOptions)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

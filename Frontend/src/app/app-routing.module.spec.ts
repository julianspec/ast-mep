import { UwWso2LoginComponent } from '@accusys/uw-core-authentication';
import { routes } from './app-routing.module';
import { NotAccessAppComponent } from './components/not-access-app/not-access-app.component';
import { RootComponent } from './pages/root/root.component';

describe('App Routing', () => {
	it('Should have [login] path', () => {
		expect(routes[0].path).toBe('login');
		expect(routes[0].component).toBe(UwWso2LoginComponent);
		expect(routes[0].data.appName).toBeDefined();
	});

	it('Should have [not-access-app] path', () => {
		expect(routes[1].path).toBe('not-access-app');
		expect(routes[1].component).toBe(NotAccessAppComponent);
		expect(routes[1].data.appName).toBeDefined();
	});

	it('Should have [root] path', () => {
		expect(routes[3].path).toBe('root');
		expect(routes[3].component).toBe(RootComponent);
		expect(routes[3].canActivate).toBeDefined();
		expect(routes[3].canActivateChild).toBeDefined();
		expect(routes[3].data.appName).toBeDefined();
	});

	it('Should have [error/home] paths', () => {
		expect(routes[3].children[0].path).toBe('error');
		expect(routes[3].children[1].path).toBe('home');
	});
});

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const APIUrl = 'https://localhost:5001/';
export const environment = {


	fake: true,





	appName: 'MEP',

	production: false,
	showlog: true,

	urlApiManager: '/apimanager',
	urlApiNotification: '/apinotification',

	//urlApiJbpm: '/apijbpm',
	redirectJbpmTask: '/root/do-task/',
	enableTaskTray: true,

	urlError: '/root/error',
	urlNotAccess: '/not-access-app',

	sleepRequestMs: 0,
	globalEnableLoad: false,
	enableGetNotificationInterval: false,
	//disableWSO2Login: false,
	disableWSO2Login: true,

	sso: {
		goAfterLogin: '/root/home',
		//clientId: 'write here your clientID',
		clientId: '753ed584-53b5-461d-be3c-7a31a1338f91',
		serverUrl: 'http://172.28.194.196:8090',
		scope: '',
		redirectUri: window.location.origin + '/login',
		userinfoEndpointAlt: '/auth/realms/master/protocol/openid-connect/userinfo',
		issuer: '/auth/realms/master',
		tokenEndpoint: '/auth/realms/master/protocol/openid-connect/token',
		userinfoEndpoint: '/auth/realms/master/protocol/openid-connect/userinfo',
		authorizationEndpoint: '/auth/realms/master/protocol/openid-connect/auth',
		jwksEndpoint: '/auth/realms/master/protocol/openid-connect/certs',
		showDebugInformation: true,
		requireHttps: false,
		responseType: 'id_token token',
		logout: '/auth/realms/master/protocol/openid-connect/logout?redirect_uri=' + window.location.origin + "/login"
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

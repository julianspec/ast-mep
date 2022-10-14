export const environment = {
	appName: '_APPNAME_',

	production: true,
	showlog: false,

	urlApiManager: '/service.manager',
	urlApiNotification: '/service.notification',

	urlApiJbpm: '/apijbpm',	
	redirectJbpmTask: '/root/do-task/',
	enableTaskTray: true,
	
	urlError: '/root/error',
	urlNotAccess: '/not-access-app',

	sleepRequestMs: 0,
	globalEnableLoad: false,
	enableGetNotificationInterval: true,

	disableWSO2Login: false,

	sso: {
		goAfterLogin: '/root/home',
		clientId: 'write here your clientID',
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

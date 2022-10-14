//#region
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./api-manager/server.uw.manager.db.json');
const middlewares = jsonServer.defaults({ noCors: true });
const db = require('./server.uw.manager.db.json');
//#endregion

server.use(jsonServer.bodyParser);
server.get('/user/getUserInfo', function (req, res) {
	console.log('getUserInfo');
	res.jsonp(setServerTime(db.getUserInfo[200]));
});

server.use(jsonServer.bodyParser);
server.get('/user/getUserApps', function (req, res) {
	console.log('getUserApps');
	res.jsonp(setServerTime(db.getUserApps[200]));
});

server.use(jsonServer.bodyParser);
server.post('/application/getAccessibleApps', function (req, res) {
	console.log('getAccessibleApps');
	res.jsonp(setServerTime(db.getAccessibleApps[200]));
});

//#region
function setServerTime(data) {
	var result = data;
	result.serverTime = new Date().toISOString();
	result.mock = true;
	return result;
}

router.render = (req, res) => {
	res.jsonp({
		error: 'Not Found',
		body: res.locals.data,
		db: res.jsonp(db)
	});
};

server.use(middlewares);
server.use(router);
server.listen(3104, () => {
	console.log('JSON Server - API - UWManager is running on port 3104');
});
//#endregion

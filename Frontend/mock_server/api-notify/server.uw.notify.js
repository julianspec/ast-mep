//#region
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./api-notify/server.uw.notify.db.json');
const middlewares = jsonServer.defaults({ noCors: true });
const db = require('./server.uw.notify.db.json');
//#endregion

server.use(jsonServer.bodyParser);
server.post('/notification/retrieveNotifications', function (req, res) {
	res.jsonp(setServerTime(db.retrieveNotifications[200]));
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
server.listen(3103, () => {
	console.log('JSON Server - API - UWNotification is running on port 3103');
});
//#endregion

var path = require('path'), fs = require('fs');

function findUwZones(startPath,filter, zones){		

	if (!fs.existsSync(startPath)){
		console.log("no dir ",startPath);
		return;
	}
	
	var files = fs.readdirSync(startPath);
	for(var i = 0; i<files.length; i++){
		var filename = path.join(startPath,files[i]);
		var stat = fs.lstatSync(filename);

		if (stat.isDirectory()) {
			findUwZones(filename,filter, zones);
		}else 

		if (filename.indexOf(filter) >= 0) {			
			var data = fs.readFileSync(filename, 'utf8');
								
				console.info(filename);
				if(data.indexOf(" uwZone=") != -1){		
					console.info(filename);
					while(data.indexOf(" uwZone=") != -1) {
						data = data.substr(data.indexOf(" uwZone=") + 9, data.length - data.indexOf(" uwZone="))
						var key = data.substr(0,data.indexOf("\""));
						zones.push({							
							"description": 'Zone found in ' + filename,
							"name": key,
							"rolesActive": [],
							"rolesVisible": [],
							"type": "ZONE"
						});
					}					
				}


		};
	};	
};

function findUwRoutes(startPath,filter, zones){
	if (!fs.existsSync(startPath)){
		console.log("no dir ",startPath);
		return;
	}

	var files = fs.readdirSync(startPath);
	for(var i = 0; i<files.length; i++){
		var filename = path.join(startPath,files[i]);
		var stat = fs.lstatSync(filename);

		if (stat.isDirectory()) {
			findUwZones(filename,filter, zones);
		}else 

		if (filename.indexOf(filter) >= 0) {			
			var data = fs.readFileSync(filename, 'utf8');											
				if(data.indexOf(" Routes = [") != -1){							
					data = data.substr(data.indexOf("["), data.length);						
					var routes = data.substring(data.indexOf("Routes = ["), data.indexOf(";"));												
					while(routes.indexOf(" zone : '") != -1) {
						routes = routes.substr(routes.indexOf(" zone : '") + 9, routes.length - routes.indexOf(" zone : '"))
						var key = routes.substr(0,routes.indexOf("\'"));
						zones.push({							
							"description": 'Zone found in ' + filename,
							"name": key,
							"rolesActive": [],
							"rolesVisible": [],
							"type": "ROUTE"
						});
					}
				}
		};
	};
};

var zonesAndRouter = [];
findUwZones('./src/app','.html', zonesAndRouter);
findUwRoutes('./src/app','routing.module.ts', zonesAndRouter);

setTimeout(() => {
	fs.writeFileSync('./src/assets/uw-zones.json', JSON.stringify(zonesAndRouter));
}, 5000);


## _APPNAME_

TODO: Info about _APPNAME_


## Guide
- Rename all place with _APPNAME_

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.


### Log into the accusys nexus repository

Check your accusys vpn network conection

Run `npm login --scope=@accusys --registry=http://192.168.50.41:11081/repository/accusys-npm/`

-  user: admin
-  pass: Accusys123*
-  email: admin@accusys.com

## First Start
First of all it is necessary to have [Node](https://nodejs.org/es/download/) installed
Run `npm run init` FOR:

-  Install node modules needs .
-  Run serve
-  Auto open `http://localhost:4200/`
-  Set ProxyConf

## Deploy

First of all it is necessary to have [Node](https://nodejs.org/es/download/) installed

Run `npm start` FOR:

-  Run serve
-  Auto open `http://localhost:4000/`
-  Set ProxyConf

## Test

Run `npm run test:coverage` to execute uni tests via karma and code coverage, Open index.html generated in coverage folder for see more details.

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `npm e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## SonarQube
First of all it is necessary to have [Node](https://nodejs.org/es/download/), [Docker](https://nodejs.org/es/download/)
1. For install sonar on docker run `docker run -d --name sonarqube -p 9000:9000 sonarqube`
2. Check file 'sonar-project.properties' to change user, pass, port, etc.
3. Run `npm run sonar` or `npm run sonar:testcoverage` for scan and upload project to sonar

Note: If you have error maybe you not are **logged into the accusys nexus repository**

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build Docker
Run `docker-compose up --build -d` to build the project in docker with nginx.

## Documentation
Use [CompoDoc](https://compodoc.app/) for generate documentation for angular projects.
-  Run `npm install -g @compodoc/compodoc` for install compodoc globaly
-  Run `npm run doc` to build documentation and see it

# Install Depency Accusys Libs
- `npm install --force @accusys/uw-core-service-model@^0.0.9`
- `npm install --force @accusys/uw-core-authentication@^0.0.6`
- `npm install --force @accusys/uw-core-components@^0.0.7`

## Libraries

-  [NGX Translate](http://www.ngx-translate.com/)
-  [NGX Translate Repo](https://github.com/ngx-translate/core)

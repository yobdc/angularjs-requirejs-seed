require.config({
	paths: {
		angular: '../../libs/angular/angular',
		angularRoute: '../../libs/angular-route/angular-route',
		angularResource: '../../libs/angular-resource/angular-resource',
		text: '../../libs/requirejs-text/text',
		jquery: '../../libs/jquery/jquery',
		bootstrap: '../../libs/bootstrap/dist/js/bootstrap',
		angularBootstrap: '../../libs/angular-bootstrap/ui-bootstrap-tpls',
        angularStrap: '../../libs/angular-strap/dist/angular-strap',
        angularStrapTpl: '../../libs/angular-strap/dist/angular-strap.tpl'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularResource': ['angular'],
		'bootstrap': ['jquery'],
		'angularBootstrap': ['angular', 'bootstrap'],
        'angularStrap': ['angular', 'bootstrap'],
        'angularStrapTpl': ['angularStrap']
	},
	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
	'angular',
	'app',
	'routes'
], function(angular, app, routes) {
	'use strict';
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);	
	});
});
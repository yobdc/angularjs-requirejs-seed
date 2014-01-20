// we get all the test files automatically
var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/spec\.js$/i.test(file)) {
			tests.push(file);
		}
	}
}

require.config({
	paths: {
		angular: '/base/libs/angular/angular',
		angularRoute: '/base/libs/angular-route/angular-route',
		angularMocks: '/base/libs/angular-mocks/angular-mocks',
		angularResource: '/base/libs/angular-resource/angular-resource',
		angularScenario: '/base/libs/angular-scenario/angular-scenario',
		text: '/base/libs/requirejs-text/text',
		fixtures: '/base/test/unit/fixtures',
		jquery: '/base/libs/jquery/jquery',
		bootstrap: '/base/libs/bootstrap/dist/js/bootstrap',
		angularBootstrap: '/base/libs/angular-bootstrap/ui-bootstrap-tpls',
	},
	baseUrl: '/base/app/js',
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		},
		'angularResource': ['angular'],
		'angularScenario': ['angular'],
		'bootstrap': ['jquery'],
		'angularBootstrap': ['angular', 'bootstrap']
	},
	deps: tests,
	callback: window.__karma__.start
});

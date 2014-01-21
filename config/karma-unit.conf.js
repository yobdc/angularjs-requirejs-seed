module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine', 'requirejs'],
        files: [
            {pattern: 'app/js/*.js', included: false},
            {pattern: 'app/js/**/*.js', included: false},
            {pattern: 'test/unit.js', included: false},
            {pattern: 'test/unit/*.js', included: false},
            {pattern: 'test/unit/**/*.js', included: false},
            {pattern: 'libs/angular/angular.js', included: false},
            {pattern: 'libs/angular-bootstrap/ui-bootstrap-tpls.js', included: false},
            {pattern: 'libs/angular-strap/dist/*.js', included: false},
            {pattern: 'libs/angular-mocks/angular-mocks.js', included: false},
            {pattern: 'libs/angular-resource/angular-resource.js', included: false},
            {pattern: 'libs/angular-route/angular-route.js', included: false},
            {pattern: 'libs/bootstrap/dist/js/bootstrap.js', included: false},
            {pattern: 'libs/requirejs/requirejs.js', included: false},
            {pattern: 'libs/jquery/jquery.js', included: false},
            // needs to be last http://karma-runner.github.io/0.10/plus/requirejs.html
            'test/main-test.js'
        ],

        autoWatch: true,

        LogLevel: LOG_DEBUG,

        browsers: ['Chrome'],

        singleRun: true,

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};

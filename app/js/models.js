define(['angular', 'angularResource', 'services'], function (angular) {
    'use strict';

    /* Services */

    // Demonstrate how to register services
    // In this case it is a simple value service.
    return angular.module('myApp.models', ['ngResource', 'myApp.services'])
        .value('version', '0.0.1');
});

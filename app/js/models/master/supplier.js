define(['providers'], function (providers) {
    providers.service('Supplier', ['ValidatorService', function (ValidatorService) {
        this.getFunction = function () {
            function Supplier(json) {
            };
            Supplier.prototype.toPostData = function(){                
                return ValidatorService.url('aa.com');
            };
            return Supplier;
        };
    }]);
    var injector = angular.injector(['myApp.providers']);
    var service = injector.get('Supplier');
    return service.getFunction();
});
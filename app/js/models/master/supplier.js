define(['services'], function (services) {
    services.provider('Supplier', ['ValidatorService',function (ValidatorService) {
        this.$get = function () {
            function Supplier(json) {
            };
            Supplier.prototype.toPostData = function(){
                return '';
            };
            return Supplier;
        };
    }]);
    return angular.injector(['myApp.services']).get('Supplier');
});
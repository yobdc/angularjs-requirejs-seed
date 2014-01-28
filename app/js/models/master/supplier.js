define(['models'], function(providers) {
    providers.service('Supplier', [
        '$timeout',
        '$log',
        'ValidatorService',
        'DdsFactory',
        '$q',
        'SupplierService',
        function($timeout, $log, ValidatorService, DdsFactory, $q, SupplierService) {
            this.$get = function() {
                var $self;

                var CONTACTINFO_TYPE = 'ContactInfo.Type';
                var CUSTOMER_TYPE = 'CustomerType';

                function Supplier() {
                    $self = this;
                    // - Supplier fields
                    $self.type = null;
                    $self.firstName = null;
                    $self.lastName = null;
                    $self.title = null;
                    $self.belongToCompany = null;
                    $self.keyword = null;
                    $self.customerFullName = null;
                    $self.accountName = null;
                    $self.accountNumber = null;
                    $self.remark = null;
                    $self.type = null;
                    $self.companyName = null;
                    $self.contactInfo = [];
                };
                Supplier.prototype.load = function(param) {
                    var promise;
                    if (typeof param === 'string') {
                        promise = $self.loadFromId(param);
                    } else if (typeof param === 'object') {
                        promise = $self.loadFromJSON(param);
                    } else {
                        promise = $self.loadNew();
                    }
                    return promise;
                };
                Supplier.prototype.loadFromId = function(id) {};
                Supplier.prototype.loadFromJSON = function(json) {};
                Supplier.prototype.loadNew = function() {
                    var q = $q.defer();
                    $q.when(DdsFactory.get([
                        CONTACTINFO_TYPE,
                        CUSTOMER_TYPE
                    ])).then(function(value) {
                        $self.dds = value;
                        $self.addContactPoint();
                        $self.type = $self.dds[CUSTOMER_TYPE].options[0].code;
                        q.resolve($self);
                    }, function(values) {
                        q.reject();
                    });
                    return q.promise;
                };
                Supplier.prototype.addContactPoint = function() {
                    $self.contactInfo = $self.contactInfo || [];
                    var newContact = {};
                    if ($self.dds && $self.dds[CONTACTINFO_TYPE]) {
                        newContact.type = $self.dds[CONTACTINFO_TYPE].options[0].code;
                        newContact.value = null;
                    }
                    $self.contactInfo.push(newContact);
                    return newContact;
                };
                Supplier.prototype.removeContactPoint = function(index) {
                    if ($self.contactInfo) {
                        $self.contactInfo.splice(index, 1);
                    }
                    return $self.contactInfo;
                };
                Supplier.prototype.validate = function() {
                    if ($self.type === 'C') {
                        if(!$self.firstName||!$self.lastName||!$self.title){
                            throw Error("姓名未填写");
                        }
                    } else if ($self.type === 'B') {
                        if(!$self.companyName){
                            throw Error("企业名称未填写");
                        }
                    }
                    if(!$self.type){
                        throw Error("供应商类型未选择");
                    }
                    if(!$self.accountName){
                        throw Error("账户名未填写");
                    }
                };
                Supplier.prototype.validateCompanyName = function(name) {
                    var q = $q.defer();
                    if (angular.isString(name)) {
                        SupplierService.validateName({
                            name: name
                        }, function(data) {
                            q.resolve(data);
                        }, function(data) {
                            q.reject(data);
                        });
                    } else {
                        $timeout(function() {
                            q.reject('name is not string');
                        });
                    }
                    return q.promise;
                };
                Supplier.prototype.create = function() {};
                Supplier.prototype.update = function() {};
                Supplier.prototype.toPostData = function() {
                    return $self;
                };
                return Supplier;
            };
        }
    ]);
    var injector = angular.injector(['myApp.models']);
    var service = injector.get('Supplier');
    return service.$get();
});
define(['models'], function(providers) {
    providers.service('Site', [
        '$timeout',
        '$log',
        '$q',
        'UidService',
        'DdsFactory',
        function($timeout, $log, $q, UidService, DdsFactory) {
            this.$get = function() {
                var $self;

                var SITE_BUSINESSSCOPE = 'Site.BusinessScope';

                function Site() {
                    $self = this;
                    $self.name = null; //名称
                    $self.number = null; //编码
                    $self.enabled = true; //是否有效
                    $self.isPrimary = false; //主地址
                    $self.country = {
                        code: null,
                        name: null
                    }; //国家
                    $self.province = {
                        code: null,
                        name: null
                    }; //省/州
                    $self.city = {
                        code: null,
                        name: null
                    }; //市
                    $self.region = {
                        code: null,
                        name: null
                    }; //区/县
                    $self.postcode = null; //邮编
                    $self.businessScope = null; //业务用途
                    $self.addressList = [{
                        address: null
                    }]; //地址
                    $self.contactList = [{}]; //联系人
                };
                Site.prototype.load = function(param) {
                    var promise;
                    if (typeof param === 'object') {
                    } else {
                        promise = $self.loadNew(param);
                    }
                    return promise;
                };
                Site.prototype.loadNew = function() {
                    $self.uid = UidService.get();
                    var q = $q.defer();
                    $q.when(DdsFactory.get([
                        SITE_BUSINESSSCOPE
                    ])).then(function(value) {
                        $self.dds = value;

                        q.resolve($self);
                    }, function(values) {
                        q.reject();
                    });
                    return q.promise;
                };
                Site.prototype.loadFromJSON = function(json) {
                };
                Site.prototype.addContact = function(){
                    $self.contactList.push({});
                }
                Site.prototype.removeContact = function(index){
                    $self.contactList.splice(index, 1);
                }
                Site.prototype.addAddress = function(){
                    $self.addressList = $self.addressList || [];
                    $self.addressList.push({
                        address: null
                    });
                }
                Site.prototype.removeAddress = function(index){
                    $self.addressList.splice(index, 1);
                }
                Site.prototype.toPostData = function() {
                };
                return Site;
            };
        }
    ]);
    var injector = angular.injector(['myApp.models']);
    var service = injector.get('Site');
    return service.$get();
});
define(['models'], function(providers) {
    providers.service('Site', [
        '$timeout',
        '$log',
        '$q',
        'UidService',
        'DdsFactory',
        'RegionService',
        function($timeout, $log, $q, UidService, DdsFactory, RegionService) {
            this.$get = function() {

                var SITE_BUSINESSSCOPE = 'BusinessPurpose';

                function Site() {
                    this.name = null; //名称
                    this.number = null; //编码
                    this.enabled = true; //是否有效
                    this.isPrimary = false; //主地址
                    this.country = {
                        code: null,
                        name: null
                    }; //国家
                    this.province = {
                        code: null,
                        name: null
                    }; //省/州
                    this.city = {
                        code: null,
                        name: null
                    }; //市
                    this.region = {
                        code: null,
                        name: null
                    }; //区/县
                    this.postcode = null; //邮编
                    this.businessScope = []; //业务用途
                    this.address = null; //地址
                    this.contactList = [{}]; //联系人
                };
                Site.prototype.load = function(param) {
                    var promise;
                    if (typeof param === 'object') {} else {
                        promise = this.loadNew(param);
                    }
                    return promise;
                };
                Site.prototype.loadNew = function() {
                    var self = this;
                    self.guid = UidService.get();
                    var q = $q.defer();
                    $q.when(DdsFactory.get([
                        SITE_BUSINESSSCOPE
                    ])).then(function(value) {
                        self.dds = value;

                        q.resolve(self);
                    }, function(values) {
                        q.reject();
                    });
                    return q.promise;
                };
                Site.prototype.loadFromJSON = function(json) {};
                Site.prototype.addContact = function() {
                    this.contactList.push({});
                }
                Site.prototype.removeContact = function(index) {
                    this.contactList.splice(index, 1);
                }
                Site.prototype.addAddress = function() {
                    this.addressList = this.addressList || [];
                    this.addressList.push({
                        address: null
                    });
                }
                Site.prototype.removeAddress = function(index) {
                    this.addressList.splice(index, 1);
                }
                Site.prototype.validate = function() {
                    if (!this.name) {
                        throw Error('地址名称未填写');
                    }
                };
                Site.prototype.convertModel  = function(){
                    this.toRegionString();
                    this.toBusinessScopeString();
                };
                Site.prototype.toRegionString = function() {
                    var str = '';
                    if (this.country.code) {
                        this.country.name = RegionService.get(this.country.code).n;
                        str += this.country.name;
                    }
                    if (this.province.code) {
                        this.province.name = RegionService.get(this.province.code).n;
                        str += ' , ' + this.province.name;
                    }
                    if (this.city.code) {
                        this.city.name = RegionService.get(this.city.code).n;
                        str += ' , ' + this.city.name;
                    }
                    if (this.region.code) {
                        this.region.name = RegionService.get(this.region.code).n;
                        str += ' , ' + this.region.name;
                    }
                    this.regionString = str;
                    return str;
                };
                Site.prototype.toBusinessScopeString = function(){
                    var str = '';
                    for (var i = 0; i < this.businessScope.length; i++) {
                        var s = this.businessScope[i];
                        if(i===0){
                            str += this.dds[SITE_BUSINESSSCOPE].map[s];
                        }else{
                            str += ','+this.dds[SITE_BUSINESSSCOPE].map[s];
                        }
                    }
                    this.businessScopeString = str;
                    return str;
                };
                Site.prototype.toPostData = function() {
                    var self = this;
                    var postData = {
                        guid: self.guid,
                        siteName: self.name,
                        siteNumber: self.number,
                        statusFlag: self.enabled ? 'Y' : 'N',
                        primaryFlag: self.isPrimary ? 'Y' : 'N',
                        country: self.country.code,
                        province: self.province.code,
                        city: self.city.code,
                        districtOrCounty: self.region.code,
                        zipcode: self.postcode,
                        address1: self.address,
                        billToSiteFlag: 'N',
                        shipToSiteFlag: 'N',
                        payerSiteFlag: 'N',
                    };
                    for (var i = 0; i < self.businessScope.length; i++) {
                        var s = self.businessScope[i];
                        switch (s.code) {
                            case 'S':
                                postData.shipToSiteFlag = 'Y';
                                break;
                            case 'B':
                                postData.billToSiteFlag = 'Y';
                                break;
                            case 'P':
                                postData.payerSiteFlag = 'Y';
                                break;
                        }
                    }
                    return postData;
                };
                return Site;
            };
        }
    ]);
    var injector = angular.injector(['myApp.models']);
    var service = injector.get('Site');
    return service.$get();
});
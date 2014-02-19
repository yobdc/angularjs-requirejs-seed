define(['models'], function(providers) {
    providers.service('Contact', [
        '$timeout',
        '$log',
        '$q',
        'UidService',
        'DdsFactory',
        'RegionService',
        function($timeout, $log, $q, UidService, DdsFactory, RegionService) {
            this.$get = function() {

                var CONTACTINFO_TYPE = 'ContactInfo.Type';

                function Contact() {
                    this.firstName = null; //名
                    this.lastName = null; //姓
                    this.title = null; //称呼
                    this.department = null; //部门
                    this.position = null; //职位
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
                    this.address = null; //地址
                    this.postcode = null; //邮编
                    this.contactInfo = []; //联系信息
                };
                Contact.prototype.load = function(param) {
                    var promise;
                    if (typeof param === 'object') {} else {
                        promise = this.loadNew(param);
                    }
                    return promise;
                };
                Contact.prototype.loadNew = function() {
                    var self = this;
                    self.uid = UidService.get();
                    var q = $q.defer();
                    $q.when(DdsFactory.get([
                        CONTACTINFO_TYPE
                    ])).then(function(value) {
                        self.dds = value;
                        self.addContactPoint();

                        q.resolve(self);
                    }, function(values) {
                        q.reject();
                    });
                    return q.promise;
                };
                Contact.prototype.loadFromJSON = function(json) {};
                Contact.prototype.addContactPoint = function() {
                    this.contactInfo = this.contactInfo || [];
                    var newContact = {};
                    if (this.dds && this.dds[CONTACTINFO_TYPE]) {
                        newContact.type = this.dds[CONTACTINFO_TYPE].options[0].code;
                        newContact.value = null;
                    }
                    this.contactInfo.push(newContact);
                    return newContact;
                };
                Contact.prototype.removeContactPoint = function(index) {
                    this.contactInfo.splice(index, 1);
                };
                Contact.prototype.validate = function() {
                    if (!this.lastName || !this.firstName) {
                        throw Error('姓名未填写');
                    }
                };
                Contact.prototype.convertModel = function() {
                    var foundEmail, foundMobile;
                    for (var i = 0; i < this.contactInfo.length; i++) {
                        var point = this.contactInfo[i];
                        if (point && !foundMobile && point.type === '1') {
                            this.mobile = point.value;
                        }
                        if (point && !foundEmail && point.type === '2') {
                            this.email = point.value;
                        }
                        if (foundEmail && foundMobile) {
                            break;
                        }
                    }
                    this.toFullname();
                    this.toRegionString();
                };
                Contact.prototype.toRegionString = function() {
                    var str = '';
                    if(this.country.code){
                        this.country.name = RegionService.get(this.country.code).n;
                        str += this.country.name;
                    }
                    if(this.province.code){
                        this.province.name = RegionService.get(this.province.code).n;
                        str += ' , ' +this.province.name;
                    }
                    if(this.city.code){
                        this.city.name = RegionService.get(this.city.code).n;
                        str += ' , ' +this.city.name;
                    }
                    if(this.region.code){
                        this.region.name = RegionService.get(this.region.code).n;
                        str += ' , ' +this.region.name;
                    }
                    this.regionString = str;
                    return str;
                };
                Contact.prototype.toFullname = function() {
                    var name = '';
                    if (this.lastName) {
                        name += this.lastName;
                    }
                    if (this.firstName) {
                        name += this.firstName;
                    }
                    this.fullname = name;
                    return name;
                };
                Contact.prototype.toPostData = function() {
                    var self = this;
                    var postData = {
                        guid: self.guid,
                        firstName: self.firstName,
                        lastName: self.lastName,
                        fullName: self.fullname,
                        honorlficSuffix: self.title,
                        department: self.department,
                        position: self.position,
                        primaryFlag: self.isPrimary?'Y':'N',
                        country: self.country.code,
                        province: self.province.code,
                        city: self.city.code,
                        districtOrCounty: self.region.code,
                        zipcode: self.postcode,
                        address1: self.address,
                        contactPoints: self.contactInfo
                    };
                    return postData;
                };
                return Contact;
            };
        }
    ]);
    var injector = angular.injector(['myApp.models']);
    var service = injector.get('Contact');
    return service.$get();
});
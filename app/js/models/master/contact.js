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
                var $self;

                var CONTACTINFO_TYPE = 'ContactInfo.Type';

                function Contact() {
                    $self = this;
                    $self.firstName = null; //名
                    $self.lastName = null; //姓
                    $self.title = null; //称呼
                    $self.department = null; //部门
                    $self.position = null; //职位
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
                    $self.address = null; //地址
                    $self.contactInfo = []; //联系信息
                };
                Contact.prototype.load = function(param) {
                    var promise;
                    if (typeof param === 'object') {} else {
                        promise = $self.loadNew(param);
                    }
                    return promise;
                };
                Contact.prototype.loadNew = function() {
                    $self.uid = UidService.get();
                    var q = $q.defer();
                    $q.when(DdsFactory.get([
                        CONTACTINFO_TYPE
                    ])).then(function(value) {
                        $self.dds = value;
                        $self.addContactPoint();

                        q.resolve($self);
                    }, function(values) {
                        q.reject();
                    });
                    return q.promise;
                };
                Contact.prototype.loadFromJSON = function(json) {};
                Contact.prototype.addContactPoint = function() {
                    $self.contactInfo = $self.contactInfo || [];
                    var newContact = {};
                    if ($self.dds && $self.dds[CONTACTINFO_TYPE]) {
                        newContact.type = $self.dds[CONTACTINFO_TYPE].options[0].code;
                        newContact.value = null;
                    }
                    $self.contactInfo.push(newContact);
                    return newContact;
                };
                Contact.prototype.removeContactPoint = function(index) {
                    $self.contactInfo.splice(index, 1);
                };
                Contact.prototype.validate = function() {
                    if (!$self.lastName || !$self.firstName) {
                        throw Error('姓名未填写');
                    }
                };
                Contact.prototype.convertModel = function() {
                    var foundEmail, foundMobile;
                    for (var i = 0; i < $self.contactInfo.length; i++) {
                        var point = $self.contactInfo[i];
                        if (point && !foundMobile && point.type === '1') {
                            $self.mobile = point.value;
                        }
                        if (point && !foundEmail && point.type === '2') {
                            $self.email = point.value;
                        }
                        if (foundEmail && foundMobile) {
                            break;
                        }
                    }
                };
                Contact.prototype.toPostData = function() {
                    return $self;
                };
                return Contact;
            };
        }
    ]);
    var injector = angular.injector(['myApp.models']);
    var service = injector.get('Contact');
    return service.$get();
});
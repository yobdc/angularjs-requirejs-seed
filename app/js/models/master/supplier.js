define(['models'], function(providers) {
    providers.service('Supplier', [
        '$timeout',
        '$log',
        'ValidatorService',
        'DdsFactory',
        '$q',
        'SupplierService',
        'UidService', 
        function($timeout, $log, ValidatorService, DdsFactory, $q, SupplierService, UidService) {
            this.$get = function() {
                var $self;

                var CONTACTINFO_TYPE = 'ContactInfo.Type';
                var CUSTOMER_TYPE = 'CustomerType';

                function Supplier() {
                    $self = this;
                    // - Supplier basic fields
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
                    // - Supplier contact info
                    $self.contactInfo = [];
                    // - Supplier personal fields
                    var person = {};
                    person.realName = null; //真实姓名
                    person.appellation = null; //称呼
                    // person.gender = null; //性别
                    person.birthday = null; //出生日期
                    person.birthplace = null //出生地
                    person.indentificationType = null; //证件类型
                    person.identificationNumber = null; //证件号码
                    // person.education = null; //学历
                    // person.married = null; //婚姻状态
                    person.personalIncome = null; //个人收入
                    person.familyIncome = null; //家庭收入
                    person.isInternalSupplier = false; //内部供应商
                    person.expiryDateFrom = null; //有效日期开始
                    person.expiryDateTo = null //有效日期结束
                    person.availableTimeFrom = null; //可联系时间开始
                    person.availableTimeTo = null; //可联系时间结束
                    // person.purchaseGroup = null; //采购组
                    person.workdays = []; //工作日
                    $self.personInfo = person;
                    // - Supplier company fields
                    var company = {};
                    company.taxRegistrationNumber = null; //纳税登记编码
                    company.taxPayerIdentity = null; //纳税人标识
                    company.staffCount = null; //员工数
                    company.establishYear = null; //建立年度
                    company.ceoName = null; //CEO名称
                    company.ceoAppellation = null; //CEO称谓
                    company.organizationCode = null; //组织机构代码
                    company.companyType = null; //类型
                    // company.businessScope = null; //业务范围
                    company.accountingPeriodEnd = null; //会计期末
                    company.isInternalSupplier = null; //内部供应商
                    company.expiryDateFrom = null; //有效日期开始
                    company.expiryDateTo = null //有效日期结束
                    company.availableTimeFrom = null; //可联系时间开始
                    company.availableTimeTo = null; //可联系时间结束
                    // company.purchaseGroup = null; //采购组
                    company.workdays = []; //工作日
                    $self.companyInfo = company;
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
                    $self.uid = UidService.get();
                    var q = $q.defer();
                    $q.when(DdsFactory.get([
                        CONTACTINFO_TYPE,
                        CUSTOMER_TYPE
                    ])).then(function(value) {
                        $self.dds = value;
                        $self.addContactPoint();
                        // 设置默认供应商类型
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
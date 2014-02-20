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

                var CONTACTINFO_TYPE = 'ContactInfo.Type',
                    CUSTOMER_TYPE = 'CustomerType',
                    PAYMENT_TERM = 'PaymentTerm',
                    MARRIED_STATUS = "maritalStatus",
                    GENDER = 'gender',
                    EDUCATION = 'education',
                    WORKDAY = 'Workday',
                    PAYMENT_METHOD = 'PaymentMethod',
                    BILL_SETTLE_TYPE = 'BillSettleType',
                    IDENTITY_CARD_TYPE = 'identityCardType',
                    CONTRACT_TYPE = 'ContractType',
                    PURCHASE_TYPE = 'PurchaseType';

                function Supplier() {
                    // - Supplier basic fields
                    this.type = null; //供应商类型
                    this.firstName = null; //名
                    this.lastName = null; //姓
                    this.title = null; //称谓
                    this.belongTo = null; //所属公司
                    this.keyword = null; //关键字
                    this.fullName = null; //客户全称
                    this.name = null; //名称
                    this.number = null; //编码
                    this.remark = null; //备注
                    this.companyName = null; //企业名称
                    // - Supplier contact info
                    this.contactInfo = [];
                    // - Supplier personal fields
                    var person = {};
                    person.realName = null; //真实姓名
                    person.title = null; //称呼
                    // person.gender = null; //性别
                    person.birthday = null; //出生日期
                    person.birthplace = null //出生地
                    // person.indentificationType = null; //证件类型
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
                    this.personInfo = person;
                    // - Supplier accounting fields
                    var accounting = {};
                    accounting.ledgerClassification = null; //总账分类
                    accounting.paymentTerm = null; //付款条件
                    accounting.creditInfo = null; //信用信息
                    accounting.billSettleType = null; //结算类型
                    accounting.ledgerPeriod = null; //账期
                    accounting.ledgerPeriodRemindDays = null; //账期提醒
                    accounting.paymentType = null; //付款方式
                    accounting.payee = null; //付款对象
                    accounting.defaultCurrency = null; //缺省币种
                    accounting.isCustomer = false; //同时为客户
                    this.accountingInfo = accounting;
                    // - Supplier company fields
                    var company = {};
                    company.taxRegistrationNumber = null; //纳税登记编码
                    company.taxPayerIdentity = null; //纳税人标识
                    company.staffCount = null; //员工数
                    company.establishYear = null; //建立年度
                    company.ceoName = null; //CEO名称
                    company.ceoTitle = null; //CEO称谓
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
                    this.companyInfo = company;
                    // - Supplier purchase fields
                    var purchase = {};
                    purchase.org = null; //采购组织
                    purchase.type = []; //类型
                    purchase.isSignedSupplier = null; //签约供应商
                    purchase.contractType = null; //签约类型
                    purchase.expiryDateFrom = null; //签约有效期开始
                    purchase.expiryDateTo = null; //签约有效期结束
                    this.purchaseInfo = purchase;
                    // - 供应商地址
                    this.sites = [];
                    // - 供应商联系人
                    this.contacts = [];
                };
                Supplier.prototype.load = function(param) {
                    var promise;
                    if (typeof param === 'string') {
                        promise = this.loadFromId(param);
                    } else if (typeof param === 'object') {
                        promise = this.loadFromJSON(param);
                    } else {
                        promise = this.loadNew();
                    }
                    return promise;
                };
                Supplier.prototype.loadFromId = function(id) {};
                Supplier.prototype.loadFromJSON = function(json) {};
                Supplier.prototype.loadNew = function() {
                    var self = this;
                    self.guid = UidService.get();
                    var q = $q.defer();
                    $q.when(DdsFactory.get([
                        CONTACTINFO_TYPE,
                        CUSTOMER_TYPE,
                        PAYMENT_TERM,
                        MARRIED_STATUS,
                        GENDER,
                        EDUCATION,
                        WORKDAY,
                        PAYMENT_METHOD,
                        BILL_SETTLE_TYPE,
                        IDENTITY_CARD_TYPE,
                        CONTRACT_TYPE,
                        PURCHASE_TYPE
                    ])).then(function(value) {
                        self.dds = value;
                        self.addContactPoint();
                        // 设置默认供应商类型
                        self.type = self.dds[CUSTOMER_TYPE].options[0].code;

                        q.resolve(self);
                    }, function(values) {
                        q.reject();
                    });
                    return q.promise;
                };
                Supplier.prototype.search = function(key) {
                    var q = $q.defer();
                    SupplierService.search({
                        query: key
                    }, function(data) {
                        q.resolve(data);
                    }, function(data) {
                        q.resolve();
                    });
                    return q.promise;
                };
                Supplier.prototype.addContactPoint = function() {
                    this.contactInfo = this.contactInfo || [];
                    var newContact = {};
                    if (this.dds && this.dds[CONTACTINFO_TYPE]) {
                        newContact.type = this.dds[CONTACTINFO_TYPE].options[0].code;
                        newContact.value = null;
                    }
                    this.contactInfo.push(newContact);
                    return newContact;
                };
                Supplier.prototype.removeContactPoint = function(index) {
                    if (this.contactInfo) {
                        this.contactInfo.splice(index, 1);
                    }
                    return this.contactInfo;
                };
                Supplier.prototype.setPrimarySite = function(site) {
                    for (var i = 0; i < this.sites.length; i++) {
                        var s = this.sites[i];
                        if (s && site && s.uid !== site.uid) {
                            s.isPrimary = false;
                        }
                    }
                };
                Supplier.prototype.setPrimaryContact = function(contact) {
                    for (var i = 0; i < this.contacts.length; i++) {
                        var s = this.contacts[i];
                        if (s && contact && s.uid !== contact.uid) {
                            s.isPrimary = false;
                        }
                    }
                };
                Supplier.prototype.validate = function() {
                    if (this.type === 'C') {
                        if (!this.firstName || !this.lastName || !this.title) {
                            throw Error("姓名未填写");
                        }
                    } else if (this.type === 'B') {
                        if (!this.companyName) {
                            throw Error("企业名称未填写");
                        }
                    }
                    if (!this.type) {
                        throw Error("供应商类型未选择");
                    }
                    if (!this.name) {
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
                Supplier.prototype.clearEmptySite = function() {
                    for (var i = 0; i < this.sites.length;) {
                        var s = this.sites[i];
                        if (s && s.guid) {
                            i++;
                        } else {
                            this.sites.splice(i, 1);
                        }
                    }
                };
                Supplier.prototype.clearEmptyContact = function() {
                    for (var i = 0; i < this.contacts.length;) {
                        var s = this.contacts[i];
                        if (s && s.guid) {
                            i++;
                        } else {
                            this.contacts.splice(i, 1);
                        }
                    }
                };
                Supplier.prototype.save = function() {
                    var q = $q.defer();
                    var self = this;
                    self.validate();
                    SupplierService.save(self.toPostData(), function(res) {}, function(res) {});
                    return q.promise;
                };
                Supplier.prototype.toPostData = function() {
                    var postData = {};
                    var self = this;
                    postData.guid = self.guid;
                    postData.supplierInfo = {
                        number: self.number,
                        name: self.name,
                        type: self.type,
                        fullName: self.fullName,
                        isCustomer: self.accountingInfo.isCustomer,
                        paymentTerm: self.accountingInfo.paymentTerm,
                        settlementType: self.accountingInfo.billSettleType,
                        paymentType: self.accountingInfo.paymentType,
                        finalAccountingDate: null,
                        currency: self.accountingInfo.defaultCurrency,
                        contractFlag: self.purchaseInfo.isSignedSupplier ? 'Y' : 'N',
                        contractType: self.purchaseInfo.contractType,
                        contractStartDate: self.purchaseInfo.expiryDateFrom,
                        contractEndDate: self.purchaseInfo.expiryDateTo,
                        remark: self.remark,
                        keyword: self.keyword
                    };
                    postData.basicInfo = {
                        belongToCompanyId: null,
                        belongToCompanyName: null,
                        remark: self.remark,
                        contactPoints: []
                    };
                    for (var i = 0; i < self.contactInfo.length; i++) {
                        var p = self.contactInfo[i];
                        if (p && p.value) {
                            postData.basicInfo.contactPoints.push(p);
                        }
                    }
                    postData.contactInfos = [];
                    for (var i = 0; i < self.contacts.length; i++) {
                        var c = self.contacts[i];
                        if (c) {
                            postData.contactInfos.push(c.toPostData());
                        }
                    }
                    postData.siteInfos = [];
                    for (var i = 0; i < self.sites.length; i++) {
                        var c = self.sites[i];
                        if (c) {
                            postData.siteInfos.push(c.toPostData());
                        }
                    }
                    if (self.type === 'C') {
                        postData.supplierInfo.isInner = self.personInfo.isInternalSupplier;
                        postData.basicInfo.effectiveDate = self.personInfo.expiryDateFrom;
                        postData.basicInfo.endDate = self.personInfo.expiryDateTo;
                        postData.basicInfo.startTime = self.personInfo.availableTimeFrom;
                        postData.basicInfo.endTime = self.personInfo.availableTimeTo;
                    } else if (self.type === 'B') {
                        postData.supplierInfo.isInner = self.companyInfo.isInternalSupplier;
                        postData.basicInfo.effectiveDate = self.companyInfo.expiryDateFrom;
                        postData.basicInfo.endDate = self.companyInfo.expiryDateTo;
                        postData.basicInfo.startTime = self.companyInfo.availableTimeFrom;
                        postData.basicInfo.endTime = self.companyInfo.availableTimeTo;
                    }
                    return postData;
                };
                return Supplier;
            };
        }
    ]);
    var injector = angular.injector(['myApp.models']);
    var service = injector.get('Supplier');
    return service.$get();
});
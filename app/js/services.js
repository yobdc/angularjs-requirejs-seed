define([
        'angular',
        'angularResource',
        'models/master/region'
    ],
    function(angular, resource, regions) {
        'use strict';

        /* Services */

        // Demonstrate how to register services
        // In this case it is a simple value service.
        var urlPrefix = '../';
        return angular.module('myApp.services', ['ngResource'])
            .value('version', '0.0.1')
            .constant('URL_PREFIX', urlPrefix)
        // - Common util api definitions start

        // --- CommandService
        .factory('CommandService', [

            function() {
                var $dataMap = {};
                var $command = {};
                return {
                    set: function(key, value) {
                        if (angular.isString(key)) {
                            $dataMap[key] = value;
                        }
                    },
                    get: function(key) {
                        return $dataMap[key];
                    },
                    remove: function(key) {
                        delete $dataMap[key];
                    },
                    contain: function(key) {
                        return (key in $dataMap);
                    },
                    getCommand: function() {
                        return $command;
                    },
                    setCommand: function(command) {
                        $command = command;
                    }
                };
            }
        ])
        // --- RegionService
        .factory('RegionService', [

            function() {
                var $regions = {};
                var root = {};
                $regions['root'] = root;
                for (var i = 0; i < regions.length; i++) {
                    var region = regions[i];
                    $regions[region.c] = region;
                    if (region.pc && $regions[region.pc]) {
                        $regions[region.pc].children = $regions[region.pc].children || [];
                        if ($regions[region.pc].children.indexOf(region) === -1) {
                            $regions[region.pc].children.push(region);
                            region.parent = $regions[region.pc];
                        }
                    }
                    if (!region.pc) {
                        region.parent = root;
                        root.children = root.children || [];
                        root.children.push(region);
                    }
                }

                return {
                    get: function(key) {
                        return $regions[key];
                    },
                    getCountries: function() {
                        return $regions['root'].children;
                    }
                };
            }
        ])
        // --- UidService
        .factory('UidService', [

            function() {
                return {
                    get: function() {
                        var d = new Date().getTime();
                        var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                            var r = (d + Math.random() * 16) % 16 | 0;
                            d = Math.floor(d / 16);
                            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
                        });
                        return uid;
                    }
                }
            }
        ])
        // --- ValidatorService
        .factory('ValidatorService', [

            function() {
                return {
                    email: function email(str) {
                        if (typeof str === 'string') {
                            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
                        }
                    },
                    phone: function phone(str) {
                        if (typeof str === 'string') {
                            return /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(str);
                        }
                    },
                    url: function url(str) {
                        if (typeof str === 'string') {
                            return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(str);
                        }
                    },
                    fax: function fax(str) {
                        if (typeof str === 'string') {
                            return /^\+?[0-9]+$/.test(str);
                        }
                    }
                };
            }
        ])
        // --- CommonService
        .service('CommonService', ['$q', 'limitToFilter', '$timeout', 'DDService',
            function($q, limitToFilter, $timeout, DDService) {
                return {
                    getAutoData: function(items, term, attr) {
                        var deferred = $q.defer(),
                            result = [];
                        if (items != undefined) {
                            for (var i = 0; i < items.length; i++) {
                                if (items[i][attr] != undefined && (term != '.' && items[i][attr].indexOf(term) != -1 || term == '.' || term[attr] != undefined)) {
                                    result.push(items[i]);
                                }
                            }
                        }
                        result = limitToFilter(result, 10);
                        $timeout(function() {
                            deferred.resolve(result);
                        })
                        return deferred.promise;
                    },

                    getSelectDds: function(code, arr) {
                        for (var i = 0; i < arr.length; i++) {
                            if ( !! arr[i]) {
                                //真是个坑啊，customer后台数据字典类型保存的是DDField（只保存code），order后台数据字典类型直接保存的code
                                //为了通用只能这样写了，重构的话，把下面的判断条件去掉一个就OK了
                                if (arr[i].code == code || arr[i].code == code.code) {
                                    return arr[i];
                                };
                            };
                        };
                        if (arr.length > 0 && !! arr[0]) {
                            return arr[0];
                        };
                    },
                    getDictData: function(dictKey, dictItem) {
                        var self = this;
                        var deferred = $q.defer();
                        var dictData = {
                            selectedDD: {},
                            options: []
                        };
                        DDService.get({
                            key: dictKey
                        }, function(data) {
                            if ( !! data.options && !! data.options.length && data.options.length > 0) {
                                dictData.options = data;
                                if (!dictItem) {
                                    dictData.selectedDD = data.options[0];
                                } else {
                                    dictData.selectedDD = self.getSelectDds(dictItem ? dictItem : undefined, data.options);
                                };
                                deferred.resolve(dictData);
                            };
                        });
                        return deferred.promise;
                    }
                };
            }
        ])
        // --- MessageService
        .service('MessageService', function() {

            this.show = false;

            // angular strap alert directive supports multiple alerts. 
            // Usually this is a distraction to user. 
            //Let us limit the messages to one    
            this.messages = [];

            this.showError = function(msg) {
                this.setMessage(msg, 'error', '错误');
            };

            this.showSuccess = function(msg) {
                this.setMessage(msg, 'success', '成功');
            };

            this.showInfo = function(msg) {
                this.setMessage(msg, 'info', '消息');
            };

            this.showWarn = function(msg) {
                this.setMessage(msg, 'warn', '警告');
            };

            this.setMessage = function(content, type, title) {
                var message = {
                    type: type,
                    title: title,
                    content: content
                };
                this.messages[0] = message;

                this.show = true;
            };

            this.close = function() {
                this.messages = [];

                this.show = false;
            };
        })
        // --- DialogService
        .service('DialogService', function($dialog) {
            /*
             *
             * @param {string} title
             *         - The title of the message box
             * @param {string} msg
             *         - The content of the message box
             * @param {function} resultCallback
             *         - The call back function, will be invoked when message box is dismissed
             * @returns {undefined}
             *         - No return value
             */
            this.showMessageBox = function(title, msg, resultCallback) {
                var btns = [{
                    result: 'cancel',
                    label: 'ȡ��'
                }, {
                    result: 'ok',
                    label: 'ȷ��',
                    cssClass: 'btn-primary'
                }];
                $dialog.messageBox(title, msg, btns).open().then(resultCallback);
            };

            /*
             *
             * @param {string} url
             *         - The url of the html to display
             * @param {string} ctrl
             *         - The corresponding controlller
             * @param {function} resultCallback
             *         - The call back function, will be invoked when dialog is dismissed
             * @returns {undefined}
             *         - No return value
             */
            this.showDialog = function(url, ctrl, resultCallback) {
                this.showDialogWithParams(url, ctrl, '', {}, resultCallback);
            };

            /*
             *
             * @param {string} url
             *         - The url of the html to display
             * @param {string} ctrl
             *         - The corresponding controlller
             * @param {string} css
             *         - The dialog css
             *         - Note: Specify '' to use default dialog css
             * @param {object} argument
             *         - The additional parameter
             *         - Note: The format of the argument shall be like {key:value,key:value,...,key:value}
             *                 To get the parameter in dialog controller, inject 'param' in controller function arguments list
             * @param {function} resultCallback, will be invoked when dialog is dismissed
             *         - The call back function
             * @returns {undefined}
             *         - No return value
             */
            this.showDialogWithParams = function(url, ctrl, css, argument, resultCallback) {

                var opts = {
                    templateUrl: url,
                    controller: ctrl
                };

                // Append css
                if (css !== '') {
                    opts['dialogClass'] = css;
                }

                // Append resolve item
                opts['resolve'] = {
                    param: function() {
                        return argument;
                    }
                };

                // Show the dialog
                $dialog.dialog(opts).open().then(resultCallback);
            };
        })
        // - Common util api definitions end
        // - Restful api definitions start
        // -- Common Restful api definitions start
        .factory('DDService', ['$resource',
            function($resource) {
                return $resource(urlPrefix + 'resources/dds/:key', {}, {
                    get: {
                        method: 'GET',
                        params: {
                            key: 'key'
                        }
                    }
                });
            }
        ])
        // --- Get dds array
        .factory('DdsFactory', ['DDService', '$q',
            function(DDService, $q) {
                function createPromise(dds) {
                    var q = $q.defer();
                    DDService.get({
                        key: dds
                    }, function(data) {
                        data.map = {};
                        for (var i = 0; i < data.options.length; i++) {
                            var o = data.options[i];
                            if (o) {
                                data.map[o.code] = o.name;
                            }
                        }
                        q.resolve(data);
                    }, function(data) {
                        q.resolve();
                    });
                    return q.promise;
                };
                return {
                    get: function(list) {
                        var promises = [];
                        var resultPromise = $q.defer();
                        if (angular.isArray(list)) {
                            for (var i = 0; i < list.length; i++) {
                                var dds = list[i];
                                if (angular.isString(dds)) {
                                    promises.push(createPromise(dds));
                                } else {
                                    throw Error('all array member should be string');
                                }
                            }
                            $q.all(promises)
                                .then(function(values) {
                                    var result = {};
                                    if (angular.isArray(values)) {
                                        for (var i = 0; i < values.length; i++) {
                                            var v = values[i];
                                            if (v) {
                                                result[v.keyword] = v;
                                            }
                                        }
                                    }
                                    resultPromise.resolve(result);
                                });
                        } else {
                            throw Error('param0 is not Array');
                        }
                        return resultPromise.promise;
                    }
                };
            }
        ])
        // ---AreaService
        .factory('AreaService', ['$resource',
            function($resource) {
                return $resource(urlPrefix + 'resources/areas/:path/', {}, {
                    getAreas: {
                        method: 'GET',
                        params: {
                            path: 'findChilds'
                        },
                        isArray: true
                    },
                    findByCode: {
                        method: 'GET',
                        params: {
                            path: 'findByCode',
                            code: ''
                        }
                    }
                });

            }
        ])
        // ---TerritoryService
        .factory('TerritoryService', ['$resource',
            function($resource) {
                return $resource(urlPrefix + 'resources/territorys/:path/', {}, {
                    findAll: {
                        method: 'GET',
                        params: {
                            path: 'findAll'
                        },
                        isArray: true
                    },
                    findByCode: {
                        method: 'GET',
                        params: {
                            path: 'findByCode',
                            code: ''
                        }
                    }
                });

            }
        ])
        // -- Common Restful api definitions end
        // -- Master Restful api definitions start
        // --- OrganizationStructureService
        .factory('OrganizationStructureService', function($resource) {
            return $resource(urlPrefix + 'resources/organizationStructure/:path/:id', {}, {
                getPrimaryStructure: {
                    method: 'GET',
                    params: {
                        path: 'getPrimaryStructure',
                        id: ''
                    }
                },
                addStructure: {
                    method: 'POST',
                    params: {
                        path: 'addStructure'
                    }
                },
                updateStructure: {
                    method: 'POST',
                    params: {
                        path: 'updateStructure'
                    }
                }
            });
        })
        // --- OrganizationService
        .factory('OrganizationService', function($resource) {
            return $resource(urlPrefix + 'resources/organizations/:path', {}, {
                getMaster: {
                    method: 'GET',
                    params: {
                        path: 'getMaster'
                    }
                },
                addOrganization: {
                    method: 'POST',
                    params: {
                        path: 'addOrganization'
                    }
                },
                updateOrganization: {
                    method: 'POST',
                    params: {
                        path: 'updateOrganization'
                    }
                }
            });
        })
        // --- OrganizationClassService
        .factory('OrganizationClassService', function($resource) {
            return $resource(urlPrefix + 'resources/organizationClass/getClassDescriptors', {}, {
                getClassDescriptors: {
                    method: 'GET'
                }
            });
        })
        // --- SupplierService
        .factory('SupplierService', ['$resource',
            function($resource) {
                return $resource(urlPrefix + 'resources/supplier/:path', {}, {
                    validateName: {
                        method: 'GET',
                        params: {
                            path: 'validatename',
                            name: ''
                        }
                    },
                    search: {
                        method: 'GET',
                        params: {
                            path: 'search',
                            query: ''
                        },
                        isArray: true
                    },
                    list: {
                        method: 'GET',
                        params: {
                            path: 'list'
                        }
                    },
                    getByGuid: {
                        method: 'GET',
                        params: {
                            path: 'getByGuid'
                        }
                    },
                    query: {
                        method: 'GET',
                        params: {
                            path: 'query'
                        }
                    },
                    save: {
                        method: 'POST',
                        params: {
                            path: 'save'
                        }
                    },
                    getNaviBoard: {
                        method: 'GET',
                        params: {
                            path: 'getNaviBoard'
                        },
                        isArray:true
                    }
                });
            }
        ])
        // --- DictQueryService
        .factory('DictQueryService', ['$resource',
            function($resource) {
                return $resource(urlPrefix + 'resources/dictQuery/:path/:key', {}, {
                    getAll: {
                        method: 'GET',
                        params: {
                            path: 'getAll'
                        },
                        isArray: true
                    },
                    fetch: {
                        method: 'GET',
                        params: {
                            path: 'fetch'
                        }
                    }
                });
            }
        ])
        // -- Master Restful api definitions end
        ;
    });

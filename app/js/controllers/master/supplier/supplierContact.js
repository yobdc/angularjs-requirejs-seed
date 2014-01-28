/*
 * Author: Frank Feng
 * Description: controller for supplier contact
 *  
 */

define([], function() {
    return ['$scope', '$routeParams',
        function($scope, $routeParams) {
            $scope.supplier = {};
            /*
             * Description: list all contacts of the supplier
             */
            $scope.listContacts = function() {
                $scope.supplier.contacts = [
                    {
                        contactId: '1',
                        firstName: '欧阳',
                        lastName: '小小',
                        honorlficSuffix: '女士',
                        dept: '销售部',
                        position: '部门经理',
                        mobile: '15987654321',
                        mail: '15987654321@139.com',
                        primary: 'true',
                        country: {
                            code: '1',
                            name: '中国'
                        },
                        area: {
                            code: '',
                            name: ''
                        },
                        province: {
                            code: '1',
                            name: '上海市'
                        },
                        city: {
                            code: '1',
                            name: '上海市'
                        },
                        district: {
                            code: '1',
                            name: '浦东新区'
                        }
                    },
                    {
                        contactId: '2',
                        firstName: '洋洋',
                        lastName: '',
                        honorlficSuffix: '先生',
                        dept: '生产部',
                        position: '部长',
                        mobile: '15123456789',
                        mail: '15123456789@139.com',
                        primary: 'false',
                    }
                ];
            };
            
            $scope.listContacts();

            /*
             * Description: add contact to the supplier
             */
            $scope.addContact = function() {

            };

            /*
             * Description: remove contact from the supplier
             */
            $scope.removeContact = function(contact) {

            };

            /*
             * Description: update contact info of the supplier
             */
            $scope.updateContact = function(contact) {

            };
        }];
});
/*
 *  Author: Frank Feng
 *  Description: controller for add and edit supplier contact
 *  
 */

define([], function() {
    return ['$scope', '$routeParams', '$window', 
        function($scope, $routeParams, $window) {
            $scope.adding = !$routeParams.contactId;
            $scope.contactId = $scope.adding === true ? null : $routeParams.contactId;
            $scope.contact = {};
            $scope.contact.telephones = [{
                pointName: '电话',
                value: '',
                markAsNew: true
            }];
            $scope.contact.mails = [{
                pointName: '邮箱',
                value: '',
                markAsNew: true
            }];
            $scope.save = function() {
                $window.location.href = '#/supplier/create';
            };
            
            $scope.cancel = function() {
                $window.location.href = '#/supplier/create';
            };
            
            $scope.areaChange = function() {
                
            };
        }];
});
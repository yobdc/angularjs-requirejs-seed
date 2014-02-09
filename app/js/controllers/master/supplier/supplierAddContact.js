/*
 *  Author: Frank Feng
 *  Description: controller for add and edit supplier contact
 *
 */

define([], function() {
    return ['$scope',
        '$routeParams',
        '$window',
        'CommandService',
        function($scope, $routeParams, $window, CommandService) {
            $scope.command = CommandService.getCommand();
            var command = $scope.command;
            if (command && command.receiver === 'SupplierAddContactCtrl') {
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
                if (command.action === 'EditContact') {
                    $scope.originalContact = command.result;
                    angular.extend($scope.contact, command.result);
                }

            }
            $scope.save = function() {
                CommandService.setCommand({
                    receiver: 'SupplierCtrl',
                    sender: 'SupplierAddContactCtrl',
                    action: $scope.command.action,
                    result: $scope.contact
                });
                if($scope.command.action==='EditContact'){
                    angular.extend($scope.originalContact, $scope.contact);
                }
                $scope.back();
            };

            $scope.cancel = function() {
                CommandService.setCommand({
                    receiver: 'SupplierCtrl',
                    action: 'CancelAddorEditContact'
                });
                $window.location.href = '#/supplier/create';
            };

            $scope.areaChange = function() {

            };
        }];
});
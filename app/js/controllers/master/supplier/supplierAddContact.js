/*
 *  Author: Frank Feng
 *  Description: controller for add and edit supplier contact
 *
 */

define([], function() {
    return [
        '$scope',
        '$routeParams',
        '$location',
        'CommandService',
        'Contact',
        '$timeout',
        function($scope, $routeParams, $location, CommandService, Contact, $timeout) {
            $scope.save = function() {
                try {
                    var contact = $scope.$data.contact;
                    contact.validate();
                    contact.convertModel();
                    CommandService.setCommand({
                        receiver: 'SupplierCtrl',
                        sender: 'SupplierAddContactCtrl',
                        action: $scope.command.action,
                        result: contact
                    });
                    if ($scope.command.action === 'EditContact') {
                        angular.extend($scope.originalContact, contact);
                    }
                    $location.path('/supplier/create');
                } catch (ex) {
                    console.warn(ex);
                }
            };

            $scope.cancel = function() {
                CommandService.setCommand({
                    receiver: 'SupplierCtrl',
                    action: 'CancelAddorEditContact'
                });
                $location.path('/supplier/create');
            };
            $scope.addContactPoint = function(){
                $scope.$data.contact.addContactPoint();
            };
            $scope.removeContactPoint = function(index){
                $scope.$data.contact.removeContactPoint(index);
            };
            $scope.init = function() {
                $scope.$data = {};
                $scope.command = CommandService.getCommand();
                var command = $scope.command;
                if (command && command.receiver === 'SupplierAddContactCtrl') {
                    $scope.$data.contact = new Contact();
                    if (command.action === 'EditContact') {
                        $scope.originalContact = command.result;
                        angular.extend($scope.$data.contact, command.result);
                    } else if (command.action === 'AddContact') {
                        $scope.$data.contact.load().then(function(value) {
                            $timeout(function() {
                                $scope.$apply();
                            });
                        });
                    }
                } else {
                    $location.path('/');
                    $scope.$apply();
                }
            };
            $scope.init();
        }];
});
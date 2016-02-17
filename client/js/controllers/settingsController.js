'use strict';

angular.module('app')
  .controller('SettingsCtrl', function($scope, $http, $rootScope, $state) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        $http.post('/reset-password', {oldPassword: $scope.user.oldPassword, password: $scope.user.newPassword, confirmation: $scope.user.confirmPassword})
          .then(function(res) {
            $rootScope.flashMsg = 'Password successfully changed.';
            $state.go('main');
          })
          .catch(function(err) {
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
      }
    };
  });


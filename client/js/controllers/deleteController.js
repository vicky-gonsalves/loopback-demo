'use strict';

angular.module('app')
  .controller('DeleteCtrl', function($scope, $rootScope, $state, $http, AuthService) {
    $scope.errors = {};

    $scope.deleteAccount = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        $http.post('/delete-account', {password: $scope.user.password})
          .then(function(res) {
            $rootScope.flashMsg = 'Account deleted successfully';
            AuthService.logout().then(function() {
              $state.go('main');
            });
          })
          .catch(function(err) {
            $scope.errors.other = 'Incorrect password';
          });
      }
    };
  });


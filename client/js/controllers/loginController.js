angular
  .module('app')
  .controller('LoginCtrl', function($scope, $window, $state, AuthService) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      $scope.errors = {};
      if (form.$valid) {
        // In the Login controller
        AuthService.login({
          email: $scope.user.email,
          password: $scope.user.password
        }).then(function(res) {
          $state.go('main');
        }).catch(function(err) {
          $scope.errors.other = 'Email / Password are not valid';
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
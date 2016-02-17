angular
  .module('app')
  .controller('SignupCtrl', function($scope, $window, $state, AuthService, $rootScope) {
    $scope.user = {};
    $scope.errors = {};
    $scope.isDisabled = false;
    $scope.register = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        $scope.isDisabled = true;
        AuthService.register({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          city: $scope.user.city
        })
          .then(function(res) {
            $rootScope.flashMsg = 'Thank you for Signing up Please check your email for verification.';
            $state.go('main');
          })
          .catch(function(err) {
            $scope.isDisabled = false;
            err = err.data;
            if (err.error.details) {
              $scope.errors = err.error.details.messages;
              form['email'].$setValidity('mongoose', false);
            } else {
              $scope.errors.other = 'Server error. Please retry.';
            }
          });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
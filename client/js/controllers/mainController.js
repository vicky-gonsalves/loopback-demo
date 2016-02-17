angular
  .module('app')
  .controller('MainCtrl', ['$scope', 'AuthService', '$rootScope', function($scope, AuthService, $rootScope) {
    $scope.flashMsg = angular.copy($rootScope.flashMsg);
    $rootScope.flashMsg = undefined;
    AuthService.ensureHasCurrentUser(function(user) {
      $scope.isLinkedToFacebook = false;
      $scope.isLinkedToGoogle = false;
      $scope.currentUser = AuthService.getCurrentUser;
      if (user.accounts) {
        var isLinkedToFacebook = user.accounts.filter(function(account) {
          return account.provider == 'facebook-link';
        });
        var isLinkedToGoogle = user.accounts.filter(function(account) {
          return account.provider == 'google-link';
        });
        $scope.isLinkedToFacebook = isLinkedToFacebook.length || user.provider == 'facebook';
        $scope.isLinkedToGoogle = isLinkedToGoogle.length || user.provider == 'google';
      }
    });
  }]);
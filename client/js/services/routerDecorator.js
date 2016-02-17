angular.module('app')
  .run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      AuthService.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $state.go('login');
        }
      });
    });
  }]);
'use strict';

angular.module('app')
  .controller('NavbarCtrl', function($scope, $state, AuthService) {
    $scope.menu = [{
      'title': 'Home',
      'link': 'main'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = AuthService.isLoggedIn;
    $scope.isAdmin = AuthService.isAdmin;
    $scope.getCurrentUser = AuthService.getCurrentUser;

    $scope.logout = function() {
      AuthService.logout();
      $state.go('main');
    };

    $scope.isActive = function(route) {
      return route === $state.current.name;
    };
  });
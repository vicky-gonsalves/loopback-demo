'use strict';

angular.module('app')
  .directive('oauthButtons', function() {
    return {
      templateUrl: 'js/components/oauth-buttons/oauth-buttons.html',
      restrict: 'EA',
      controller: 'OauthButtonsCtrl',
      controllerAs: 'OauthButtons',
      scope: {
        classes: '@'
      }
    };
  });

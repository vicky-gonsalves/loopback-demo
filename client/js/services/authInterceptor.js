angular.module('app')
  .factory('authInterceptor', function($rootScope, $q, $cookies, $injector, LoopBackAuth) {
    var state;
    return {
      // Add authorization token to headers
      //request: function(config) {
      //  config.headers = config.headers || {};
      //  if ($cookies.get('token')) {
      //    config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      //  }
      //  return config;
      //},

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          LoopBackAuth.clearUser();
          LoopBackAuth.clearStorage();
          (state || (state = $injector.get('$state'))).go('login');
        }
        return $q.reject(response);
      }
    };
  });

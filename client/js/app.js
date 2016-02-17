angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ngCookies',
    'ngSanitize',
    'validation.match'
  ])
  .config(function($httpProvider, LoopBackResourceProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    // Use a custom auth header instead of the default 'Authorization'
    //LoopBackResourceProvider.setAuthHeader('X-Access-Token');
    // Change the URL where to access the LoopBack REST API server
   // LoopBackResourceProvider.setUrlBase('http://localhost:3000');
  });

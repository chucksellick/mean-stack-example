// Main Angular module
var app = angular.module("SkyTestApp", ['ui.router', 'ui.bootstrap', 'ui.utils', 'ngStorage']);
app
  // Setup routes
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('signin', {
        url: '/',
        templateUrl: 'partials/signin.html'
      })
      .state('signedin', {
        url: '/',
        templateUrl: 'partials/signedin.html'
      });
  }])
  // Set up Authorization headers once we have an authentication token
  .factory('authInterceptor', function ($q, $sessionStorage) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $sessionStorage.token;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
        }
        return response || $q.when(response);
      }
    };
  });
  // Intercept HTTP requests with the auth token
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

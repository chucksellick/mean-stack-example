// Main Angular module
var app = angular.module("SkyTestApp", ['ui.router', 'ui.bootstrap', 'ui.utils']);
app.
  config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    $stateProvider.
      state('signin', {
        url: '/',
        templateUrl: 'partials/signin.html'
      });
  }]);
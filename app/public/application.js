// Main Angular module
var app = angular.
  module("SkyTestApp", ['ui.router', 'ui.bootstrap', 'ui.utils']).
  config(['$stateProvider', function($stateProvider) {
    $stateProvider.
      state('signin', {
        url: '/',
        templateUrl: 'partials/signin.html'
      });
  }]);
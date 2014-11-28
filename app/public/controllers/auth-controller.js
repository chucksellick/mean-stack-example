// Client-side authentication controller
angular
  .module("SkyTestApp")
  .controller("AuthController", ['$rootScope', '$scope', '$http', '$sessionStorage', '$state', function($rootScope, $scope, $http, $sessionStorage, $state) {

    // Model to bind username/password to
    $scope.auth = {};
    $scope.session = $sessionStorage;
    $rootScope.authenticated = $sessionStorage.token ? true : false;

    // Authentication click handler
    $scope.authenticate = function(auth) {
      // POST the authenication data
      $http
        .post('/authenticate', $scope.auth)
        .success(function (data, status, headers, config) {
          // Receive a JSON Web Token
          $sessionStorage.token = data.token;
          $sessionStorage.username = $scope.auth.username;
          $rootScope.authenticated = true;
          // Redirect to logged in page
          $state.transitionTo('signedin');
        })
        .error(function (data, status, headers, config) {
          // Erase any existing token
          delete $sessionStorage.token;
          $rootScope.authenticated = false;

          // Display an error
          $scope.error = 'Authentication failed, please check your username and password and try again';
        });
    };

    $scope.signout = function() {
      delete $sessionStorage.token;
      $rootScope.authenticated = false;
      $state.transitionTo('signin');
    };

  }]);
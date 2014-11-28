// Client-side authentication controller
angular
  .module("SkyTestApp")
  .controller("AuthController", ['$scope', '$http', '$sessionStorage', '$state', function($scope, $http, $sessionStorage, $state) {

    // Model to bind username/password to
    $scope.auth = {};

    // Authentication click handler
    $scope.authenticate = function(auth) {
      // POST the authenication data
      $http
        .post('/authenticate', $scope.auth)
        .success(function (data, status, headers, config) {
          // Receive a JSON Web Token
          $sessionStorage.token = data.token;
          $sessionStorage.username
          // Redirect to logged in page
          $state.transitionTo('signedin');
        })
        .error(function (data, status, headers, config) {
          // Erase any existing token
          delete $sessionStorage.token;

          // Display an error
          $scope.error = 'Authentication failed, please check your username and password and try again';
        });
    };

    $scope.signout = function() {
      delete $sessionStorage.token;
      $state.transitionTo('signin');
    };

  }]);
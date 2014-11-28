angular.
  module("SkyTestApp").
  controller("AuthController", ['$scope', function($scope){

    // Model to bind username/password to
    $scope.auth = {};

    // Authentication click handler
    $scope.authenticate = function(auth) {
      console.log(auth);
    };

  }]);
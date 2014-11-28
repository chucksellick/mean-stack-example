// Client-side authentication controller
angular
  .module("SkyTestApp")
  .controller("LogsController", ['$scope', '$http', function($scope, $http) {

    $scope.json = "";

    // Init function to populate list
    $scope.populate = function() {
      $http
        .get('/api/authentication-logs')
        .success(function (data, status, headers, config) {
          $scope.json = data; 
          $scope.error = "";
        })
        .error(function (data, status, headers, config) {
          $scope.json = "";
          $scope.error = "Only 'admin' user can view the logs."; 
        });
    };
    
  }]);
myApp.controller("HomeController", ["$scope", "DataService", function($scope, DataService){
  //show user
  $scope.user = DataService.user;

}]);

var app = angular.module('app', []);

app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    $scope.cat = {};
    $scope.cats = [];

    $scope.scott = {};

    var fetchCats = function(){
      $http.get("/cats").then(function(response){
          $scope.cats = response.data;
          $scope.cat = {};
      });
    };

    $scope.add = function(kitty){
        return $http.post("/cats", kitty).then(fetchCats());
    };

    fetchCats();
}]);

// $.ajax({
//     type: "POST",
//     url: "/data",
//     data: kitty,
//     success: function(data){
//
//     }
// });

myApp.controller("ExeController", ["$scope", "DataService", function($scope, DataService){
  //show exercise
    DataService.getExercise();
    $scope.exerciseEntered = DataService.exercise;
    $scope.exeNum = DataService.exeCount;
    //delete exercise
    $scope.deleteEercise = function(data){
      DataService.deleteExerciseData(data);
    }
}]);

myApp.controller("DiaryController", ["$scope", "DataService", function($scope, DataService){
DataService.getDiary();
$scope.diaryEntered = DataService.entry;
$scope.diaryNum = DataService.diaryCount;

$scope.deleteDiary = function(data){
  DataService.deleteDiaryData(data);
}
}]);

myApp.controller("VocController", ["$scope", "DataService", function($scope, DataService){

//show vocabulary
DataService.getVocabulary();
$scope.vocabularyEntered = DataService.data;
$scope.vocNum = DataService.vocCount;
//delete vocabulary
$scope.deleteVoc = function(data){
  DataService.deleteVocData(data);
}
}]);

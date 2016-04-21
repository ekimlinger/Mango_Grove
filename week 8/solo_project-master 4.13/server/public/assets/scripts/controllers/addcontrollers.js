myApp.controller("AddController", ["$scope", "$http", "DataService", function($scope, $http, DataService){
  //set variables to store objects
    $scope.randomWord = [];
    $scope.data = [];
    $scope.vocabulary = [];
    $scope.exercises = ["Running","Swimming","Yoga","Tennis","Skating"];
//search synoym and antynom
    $scope.search = function(data){
      console.log("We are going to go look for ", data);
      $http.get("http://words.bighugelabs.com/api/2/784ce18f8301cae5e5e361a7ec795aca/" + data.name + "/json").then(function(response){
          console.log(response.data);
          $scope.data = [];
          $scope.data.push(response.data);
          $scope.words ={};
      });
    };
//search chinese-english
    $scope.look = function(data){
      console.log("We are going to go look for ", data);
      $http.get("http://fanyi.youdao.com/openapi.do?keyfrom=shell0720&key=1801546933&type=data&doctype=json&version=1.1&q="+ data.name).then(function(response){
          console.log(response.data);
          $scope.vocabulary = [];
          $scope.vocabulary.push(response.data);
          $scope.translate = {};
      });
    };


//save translation
    $scope.addWord = function(data){
        console.log(data);
        DataService.postVocabulary(data);
    };
//save diary
    $scope.diaryEntry = function(data){
        console.log(data);
        DataService.postDiary(data);
        $scope.diary ={};
    };
    //word count function
    $scope.countOf = function(text){
      var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
      return s ? s.length : '';
    }
    //save exercise
    $scope.exerciseEntry = function(data){
        console.log(data);
        DataService.postExercise(data);
        $scope.exercise = {};
    };
}]);

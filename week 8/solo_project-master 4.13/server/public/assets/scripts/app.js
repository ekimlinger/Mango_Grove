var myApp = angular.module("myApp", ["ngMaterial", "ngMessages", "ngRoute"]);

myApp.config(['$mdThemingProvider', function($mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');
}]);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when("/home/", {
            templateUrl: "/views/routes/home.html",
            controller: "HomeController"
        }).
        when("/add/", {
            templateUrl: "/views/routes/add.html",
            controller: "AddController"
        }).
        when("/diary/", {
            templateUrl: "/views/routes/diary.html",
            controller: "DiaryController"
        }).
        when("/vocabulary/", {
            templateUrl: "/views/routes/vocabulary.html",
            controller: "VocController"
        }).
        when("/exercise/", {
            templateUrl: "/views/routes/exercise.html",
            controller: "ExeController"
        }).
        otherwise({
            redirectTo: "/home/"
        });
}]);

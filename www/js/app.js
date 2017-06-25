// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

var city = null;
var fuel = null;

myApp.controller('citiesController', function($scope, $http) {
    
        $http.get("http://dailyfuelprice.herokuapp.com/v1/cities")
            .success(function(data) {
                $scope.cityArr = data.cities;
            })
            .error(function(data) {
                alert("Can't GET Cities.");
            });
    
        $scope.myFunc = function(selectedCity){
            city = $scope.selectedCity;
        }
     
});

myApp.controller('fuelController', function($scope, $http) {
    
        $http.get("http://dailyfuelprice.herokuapp.com/v1/fuel-types")
            .success(function(data) {
                $scope.fuelArr = data.fuel_types;
            })
            .error(function(data) {
                alert("Can't GET Fuel.");
            });
            
        $scope.myFunc = function(selectedFuel){
            fuel = $scope.selectedFuel;
        }
     
});

myApp.controller('priceController', function($scope, $http){
    $scope.obtainPrice = function(){
        console.log(fuel);
        console.log(city);
        $http.get("http://dailyfuelprice.herokuapp.com/v1/price/"+city+"/"+fuel)
            .success(function(data) {
                $scope.price = data.price;
                console.log(data.price);
            })
            .error(function(data) {
                alert("Can't GET Price.");
            });
    }
});
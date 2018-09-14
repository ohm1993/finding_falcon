'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'ngSanitize',
  'ui.select'
]);
myApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
myApp.service('dataService', function($http) {
  delete $http.defaults.headers.common['X-Requested-With'];
  this.getPlanets = function() {
      return $http({
          method: 'GET',
          url: 'https://findfalcone.herokuapp.com/planets'
       });
   }
   //method to get all the vehicles from the api
  this.getVehicles = function() {
    return $http({
        method: 'GET',
        url: 'https://findfalcone.herokuapp.com/vehicles'
     });
  }
  this.gettoken = function(){
    return $http({
      method: 'POST',
      url: 'https://findfalcone.herokuapp.com/token',
      headers: {'Content-Type': 'application/json'}
   });
  }
  this.find_falcone = function(token,planetName,vehicleName){

  }
});


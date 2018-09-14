'use strict';

var app = angular.module('myApp.view1', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]);

app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

app.controller('View1Ctrl',function($scope,dataService,$window) {
  $scope.timetaken = 0;
  var planets_name = [];
  var vehicle_name = [];
  $scope.disabledDestination2 = true;
  $scope.disabledDestination3 = true;
  $scope.disabledDestination4 = true;
  dataService.getPlanets().then(function(dataResponse) {
    $scope.planets = dataResponse.data;
  });
  dataService.getVehicles().then(function(dataResponse){
    $scope.vehicles = dataResponse.data;
  });
  $scope.onSelectCallback1 = function(item){
    if(item != '' || item != NULL){
       $scope.showVehiclesForDest1 = true;
       $scope.selectedDestination1 = item;
       $scope.planet1_timetaken = $scope.timetaken;
    }
  }
  $scope.onSelectCallback2 = function(item){
    if(item != '' || item != NULL){
       $scope.showVehiclesForDest2 = true;
       $scope.selectedDestination2 = item;
       $scope.planet1_timetaken = $scope.timetaken;
    }
  }
  $scope.onSelectCallback3 = function(item){
    if(item != '' || item != NULL){
       $scope.showVehiclesForDest3 = true;
       $scope.selectedDestination3 = item;
       $scope.planet1_timetaken = $scope.timetaken;
    }
  }
  $scope.onSelectCallback4 = function(item){
    if(item != '' || item != NULL){
       $scope.showVehiclesForDest4 = true;
       $scope.selectedDestination4 = item;
       $scope.planet1_timetaken = $scope.timetaken;
    }
  }
  $scope.toggleSelection = function toggleSelection(event) {
    if(event.target.checked == true){
       $scope.disabledDestination2 = false;
       $scope.timetaken = $scope.planet1_timetaken + $scope.selectedDestination1.distance/$scope.selectedVehicle.speed;
       planets_name.push($scope.selectedDestination1.name);
       vehicle_name.push($scope.selectedVehicle.name);
    }
  };
  $scope.vehicleselection2 = function(event){
    if(event.target.checked == true){
      $scope.disabledDestination3 = false;
      $scope.timetaken = $scope.planet1_timetaken + $scope.selectedDestination2.distance/$scope.selectedVehicle2.speed;
      planets_name.push($scope.selectedDestination2.name);
      vehicle_name.push($scope.selectedVehicle2.name);
    }
  }
  $scope.vehicleselection3 = function(event){
    if(event.target.checked == true){
      $scope.disabledDestination4 = false;
      $scope.timetaken = $scope.planet1_timetaken + $scope.selectedDestination3.distance/$scope.selectedVehicle3.speed;
      planets_name.push($scope.selectedDestination3.name);
      vehicle_name.push($scope.selectedVehicle3.name);
    }
  }
  $scope.vehicleselection4 = function(event){
    if(event.target.checked == true){
      $scope.timetaken = $scope.planet1_timetaken + $scope.selectedDestination4.distance/$scope.selectedVehicle4.speed;
      planets_name.push($scope.selectedDestination4.name);
      vehicle_name.push($scope.selectedVehicle4.name);
    }
  }
  $scope.findfalcone = function(){
    var token;
    dataService.gettoken().then(function(dataResponse) {
    token = dataResponse.data;
    });
    if(token!=null && planets_name.length == 4 && vehicle_name.length == 4){
      dataService.find_falcone(token,planets_name,vehicle_name).then(function(dataResponse){
        if(dataResponse.status == "success"){
          console.log("planet found and name is",dataResponse.planet_name);
        }else{
          if(dataResponse.status == "false"){
            console.log("planet not found");
          }else{
            if(dataResponse.error){
              console.log("token not initialised");
            }
          }
        }
      });
    }
    else{
      alert("please select all values");
    }
  }
});
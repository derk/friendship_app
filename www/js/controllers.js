angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('AppCtrl', function($scope, $rootScope, DataService) {
  $scope.user = {};

  $scope.sync = function () {
    DataService.sync();
  }
  // Called when the form is submitted
  $scope.loginUser = function(user) {
    //do some faux auth by querying the user table in local storage
    $rootScope.session = user.pin;
    $scope.user.pin = '';
  };
})
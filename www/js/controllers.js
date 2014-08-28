angular.module('starter.controllers', [])

// A simple controller that fetches a list of data from a service
.controller('AppCtrl', function($scope, $rootScope, DataService, USER_ROLES, AuthService, Session) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
 
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.logOut = function () {
    Session.destroy;
  }
})

.controller('LoginCtrl', function($scope, $rootScope, $location, DataService, AUTH_EVENTS, AuthService) {

  // syncs cached users with remote server
  $scope.sync = function () {
    DataService.sync();
  }

  $scope.credentials = {
    pin: ''
  };

  // Called when the form is submitted
  $scope.loginUser = function (credentials) {
    var user = AuthService.login(credentials);

    if(user.pin){
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
      $location.path('main');
      $scope.$apply();
      alert("logged in");
    }
    else {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    }
  };
})
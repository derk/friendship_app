angular.module('starter.controllers', [])

// A simple controller that fetches a list of data from a service
.controller('AppCtrl', function($scope, $rootScope, localstorage, $state, DataService, USER_ROLES, AuthService, Session) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
 
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.logOut = function () {
    $scope.currentUser = null;
    Session.destroy();
    $state.go('login');
  };

  $scope.lastSync = localstorage.get('lastSync');

  $scope.sessionId = Session.id;
  $scope.userId = Session.userId;
  $scope.userRole = Session.userRole;
})

.controller('MainCtrl', function($scope, localstorage) {
  
})

.controller('NewPatientsCtrl', function($scope, localstorage) {
  $scope.master = {
    // patientId: '',
    // firstName: '',
    // lastName: '',
    // address: '',
    // city: '',
    // phone: '',
    // chw_guid: ''
  };

  $scope.createParticipant = function(participant) {
    $scope.master = angular.copy(participant);
  };

  $scope.reset = function() {
    $scope.participant = angular.copy($scope.master);
  };
  $scope.reset();
})

.controller('LoginCtrl', function($scope, $rootScope, $state, DataService, AUTH_EVENTS, AuthService) {

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

    if(user){
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
      $state.go('main');
      $scope.credentials = {
        pin: ''
      };
    }
    else {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    }
  };
})
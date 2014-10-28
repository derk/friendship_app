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

  $scope.sessionId = Session.id;
  $scope.userId = Session.userId;
  $scope.userRole = Session.userRole;
})

.controller('MainCtrl', function($scope, localstorage, DataService) {
  function lastSync() {
    $scope.lastSync = localstorage.get('lastSync');
  };

  $scope.syncData = function () {
    DataService.syncData();
    lastSync();
  }

  lastSync();
})

.controller('PatientsCtrl', function($scope, $state, ScopedParticipants, Session) {
  $scope.participants = ScopedParticipants.participants($scope.currentUser);
  $scope.userRole = Session.userRole;
})

.controller('NewPatientsCtrl', function($scope, GuidMaker, $state) {

  $scope.createParticipant = function(participant) {
    if(p.find("participants", {patient_identifier: participant.patient_identifier}).length == 0) {
      participant.guid = GuidMaker.guid();
      p.save('participants', participant);
      $state.go('newPatients.demographics');
    }
    else {
      alert("Patient already exists");
      $scope.reset();
    }
  };

  $scope.reset = function(event) {
    $scope.participant = {};
  };

  $scope.reset();

  $scope.formTemplate = {
        "first": {
            "type": "text",
            "label": ""
        },
        "last": {
            "type": "text",
            "label": ""
        },
        "submit": {
            "type": "submit",
            "label": "submit",
            "attributes": {"class": "button"}
        },
    };
})

.controller('LoginCtrl', function($scope, $rootScope, $state, DataService, AUTH_EVENTS, AuthService) {

  // syncs cached users with remote server
  $scope.syncUsers = function () {
    DataService.syncUsers();
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

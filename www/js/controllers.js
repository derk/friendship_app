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

.controller('NewPatientsCtrl', function($scope, GuidMaker, $state, $stateParams) {

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

  $scope.pageTitle = 'Demographics';

    //allows you to pass a question index url param into the question group directive
    $scope.questionIndex = parseInt($stateParams.questionIndex)-1 || 0;

    //overrides questiongroup default submit action to send data to PR
    // $scope.submit = function(){

        // var _SAVE_LOCATION = 'surveys';

        // var responses = $('form').serializeArray();

        // _.each(responses, function(el){


        //   var payload = {
        //     userId: UserDetails.find,
        //     survey: $scope.pageTitle,
        //     questionDataLabel: el.name,
        //     questionValue: el.value,
        //     sessionGUID: Guid.create(),
        //     savedAt: new Date()
        //   };

        //   // (new PurpleRobot()).emitReading(_SAVE_LOCATION,payload).execute();
        //   console.log(payload);

        // });

  $scope.questionGroups = [
    {
      content: "Include demographic information",
      id: "d485d4c8d859f8cc",
      order: 0,
      questionDataLabel: "",
      questionGroup: "demographics",
      required: "",
      responseGroupId: "",
      responses: [],
      type: "html"
    },
    {
      content: "Over the past week, how often have you been bothered by LITTLE INTEREST OR PLEASURE IN DOING THINGS?",
       id: "f99a845eea530b2c",
       order: 1,
       questionDataLabel: "demographics1",
       questionGroup: "demographics",
       required: "required",
       responseGroupId: "demographics",
       type: "radio",
       responses: [
        {
          Objectid: "6f04febc1dcd99011",
          label: "Not at all",
          order: "1",
          value: "0",
          responseGroupId: "demographics",
          responseGroupLabel: "demographics"
        },
        {
        Objectid: "6f04febc1dcd99012",
          label: "Several days",
          order: "2",
          value: "2",
          responseGroupId: "demographics",
          responseGroupLabel: "demographics"
        },
        {
        Objectid: "6f04febc1dcd99013",
          label: "More than half the days",
          order: "3",
          value: "3",
          responseGroupId: "demographics",
          responseGroupLabel: "demographics"
        },
        {
        Objectid: "6f04febc1dcd99014",
          label: "Nearly every day",
          order: "4",
          value: "4",
          responseGroupId: "demographics",
          responseGroupLabel: "demographics"
        }
      ]

    },
    {
      content: "Over the past week, how often have you been bothered by LITTLE INTEREST OR PLEASURE IN DOING THINGS?",
       id: "f99a845eea530b2c",
       order: 2,
       questionDataLabel: "demographics1",
       questionGroup: "demographics",
       required: "required",
       responseGroupId: "demographics",
       type: "checkbox",
       responses: [
        {
          Objectid: "6f04febc1dcd99011",
          label: "Not at all",
          order: "1",
          value: "0",
          responseGroupId: "demographics",
          responseGroupLabel: "demographics"
        },
        {
        Objectid: "6f04febc1dcd99012",
          label: "Several days",
          order: "2",
          value: "2",
          responseGroupId: "demographics",
          responseGroupLabel: "demographics"
        },
        {
        Objectid: "6f04febc1dcd99013",
          label: "More than half the days",
          order: "3",
          value: "3",
          responseGroupId: "demographics",
          responseGroupLabel: "demographics"
        },
        {
        Objectid: "6f04febc1dcd99014",
          label: "Nearly every day",
          order: "4",
          value: "4",
          responseGroupId: "demographics",
          responseGroupLabel: "demographics"
        }
      ]

    }
  ];
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

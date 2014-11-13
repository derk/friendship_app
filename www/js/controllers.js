angular.module('starter.controllers', [])

// A simple controller that fetches a list of data from a service
.controller('AppCtrl', function($scope, $state, USER_ROLES, AuthService, Session, $cookieStore, $rootScope, lastSync) {

  $scope.currentUser = Session.currentUser();
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;

  $scope.logOut = function () {
    $scope.currentUser = null;
    Session.destroy();
    $state.go('login');
  };

  $scope.$on('userChanged', function(){
    $scope.currentUser = Session.currentUser();
  });

  $scope.lastSync = lastSync.get();
  $scope.$on('synced!', function(){
    $scope.lastSync = lastSync.get();
  });
})

.controller('MainCtrl', function($scope, localstorage, DataService, Session, lastSync) {

  $scope.syncData = function () {
    DataService.syncData();
    lastSync.update();
  }

})

.controller('PdfCtrl', function($scope) {
    $scope.pdfUrl = 'pdfs/manual.pdf';
})

.controller('PatientsCtrl', function($scope, $state, ScopedParticipants, Session) {
  $scope.participants = ScopedParticipants.participants($scope.currentUser);
  $scope.userRole = Session.currentUser().role;
})

.controller('NewPatientsCtrl', function($scope, GuidMaker, $state, $stateParams, SurveyBuilder, surveyService, Session, ClientIdMaker) {

    $scope.getScreening = function (language) {
      var screeningQuestions = surveyService.getScreening();
      $scope.questionGroups = SurveyBuilder.build(screeningQuestions, language)
      $state.go('newPatients.screening')
      $scope.language = language
    }

    $scope.switchLanguage = function (language) {
        switch (language) {
          case "English":
            $scope.language = "Shona";
            break;
          case "Shona":
            $scope.language = "English";
            break;
        }
    };

   $scope.questionIndex = parseInt($stateParams.questionIndex)-1 || 0;

   $scope.responses = {};

   $scope.patient = {
      guid: GuidMaker.guid(),
      research_assistant_id: Session.currentUser().guid
    }

   $scope.submit = function () {
      var surveyResponse = {
        guid: GuidMaker.guid(),
        surveyType: "screening",
        user_id: Session.currentUser().guid,
        patient_id: $scope.patient.guid,
        responses: $scope.responses
      };

      $scope.patient.patient_identifier = ClientIdMaker.makeID($scope.patient.clinic);

      p.save("participants", $scope.patient);
      p.save("surveyResponses", surveyResponse);
      $state.go('main');
   }

})

.controller('LoginCtrl', function($scope, $rootScope, $state, DataService, AUTH_EVENTS, AuthService, Session) {
  Session.destroy();
  // syncs cached users with remote server
  $scope.syncUsers = function () {
    DataService.syncUsers();
  }
  $scope.getSurveys = function () {
    DataService.getSurveys();
  }

  $scope.credentials = {
    pin: ''
  };

  // Called when the form is submitted
  $scope.loginUser = function (credentials) {
    var user = AuthService.login(credentials);

    if(user){
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
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

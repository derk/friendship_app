angular.module('friendshipBench.controllers', [])

// A simple controller that fetches a list of data from a service
.controller('AppCtrl', function($scope, $state, USER_ROLES, AuthService, Session, $rootScope, lastSync) {

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

.controller('MainCtrl', function($state, $scope, localstorage, DataService, Session, lastSync) {

  $scope.go = function (state) {
    $state.go(state);
    alert(state);
  }

  $scope.syncData = function () {
    DataService.syncData();
    lastSync.update();
  }

  $scope.downloadSurveys = function () {
    DataService.getSurveys();
  }

})

.controller('PdfCtrl', function($scope) {
    $scope.pdfUrl = 'pdfs/manual.pdf';
})

.controller('PatientsCtrl', function($scope, $state, ParticipantFactory, Session) {
  $scope.participants = ParticipantFactory.scopedParticipants($scope.currentUser);
  $scope.userRole = Session.currentUser().role;
})

.controller('NewPatientsCtrl', function($scope, GuidMaker, $state, Session, ClientIdMaker, $stateParams, SurveyBuilder, surveyService) {

   $scope.patient = {
      guid: GuidMaker.guid(),
      research_assistant_id: Session.currentUser().guid
    }

    $scope.getScreening = function (language) {
      $scope.patient.patient_identifier = ClientIdMaker.makeID($scope.patient.clinic);
      p.save("participants", $scope.patient);
      $scope.questionGroups = p.find('screeningSurveys')[0];
      $state.go('newPatients.screening');
      $scope.language = language;
      $scope.survey = "Screening";
    }

    $scope.getBaseline = function (language) {
      $scope.survey = "Baseline/3/6"
      $scope.questionGroups = p.find('baselineSurveys')[0];
      $state.go('newPatients.baseline')
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

  function buildResponse (survey, patient, responses) {
      var surveyResponse = {
            guid: GuidMaker.guid(),
            survey_type: survey,
            user_id: Session.currentUser().guid,
            patient_id: patient.guid,
            responses: responses
          };
          return surveyResponse;
   }

   $scope.submit = function () {
     var surveyResponse = buildResponse($scope.survey, $scope.patient, $scope.responses);

      switch($scope.survey) {

        case "Screening":
          p.save("surveyResponses", surveyResponse);
          $scope.getBaseline("English");
          break;

        case "Baseline/3/6":
          p.save("surveyResponses", surveyResponse);
          $state.go("main");
          break;
      }
  }
})

.controller('LoginCtrl', function($scope, $rootScope, $state, DataService, AUTH_EVENTS, AuthService, Session) {
  Session.destroy();
  // syncs cached users with remote server

  $scope.sync = function () {
    DataService.syncUsers();
    DataService.exportResponses();
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

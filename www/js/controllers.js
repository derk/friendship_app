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

.controller('NewPatientsCtrl', function($scope, GuidMaker, $state, $stateParams, SurveyBuilder, screeningService) {

    //start screening
    $scope.getScreening = function (language) {
      screeningService.getScreening().then(
        function(payload) {
          $scope.questionGroups = SurveyBuilder.build(payload.data, language)
          $state.go('newPatients.screening')
          $scope.language = language
        }
      );
    };

    $scope.questionIndex = parseInt($stateParams.questionIndex)-1 || 0;
    //overrides questiongroup default submit action to send data to PR
    // $scope.submit = function(){

   $scope.survey = {};

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

})

.controller('LoginCtrl', function($scope, $rootScope, $state, DataService, AUTH_EVENTS, AuthService, Session) {
  Session.destroy();
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

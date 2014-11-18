// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
               'ionic',
               'starter.services',
               'starter.controllers',
               'starter.factories',
               'starter.directives',
               'pdf',
               'starter.questions',
               'starter.survey_builder',
               'ngCookies'
])

.config(function($stateProvider, $urlRouterProvider, USER_ROLES, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $httpProvider.defaults.useXDomain = true;

  $urlRouterProvider.otherwise("login");

  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginCtrl"
    })
    .state('main', {
      url: '/main',
      templateUrl: 'templates/main.html',
      controller: "MainCtrl",
      data: {
        authorizedRoles: [USER_ROLES.asisstant, USER_ROLES.supervisor, USER_ROLES.chw]
      }
    })
    .state('pdf', {
      url: '/pdf',
      templateUrl: 'templates/pdf.html',
      controller: 'PdfCtrl',
      data: {
        authorizedRoles: [USER_ROLES.asisstant, USER_ROLES.supervisor, USER_ROLES.chw]
      }
    })

    .state('newPatients', {
      abstract: true,
      url: '/new_patients',
      templateUrl: 'templates/newPatients.html',
      controller: "NewPatientsCtrl",
      data: {
        authorizedRoles: [USER_ROLES.asisstant, USER_ROLES.supervisor]
      }
    })

    .state('newPatients.landing', {
      url: '/landing',
      templateUrl: "templates/newPatients.landing.html",
    })

    .state('newPatients.screening', {
      url: '/screening',
      templateUrl: "templates/newPatients.screening.html",
    })

    .state('newPatients.baseline', {
      url: '/baseline',
      templateUrl: "templates/newPatients.baseline.html",
    })

    .state('patients', {
      url: '/patients',
      views: {
        '': {
          templateUrl: "templates/patients.html",
          controller: "PatientsCtrl"
        },
        "health-worker-table@patients": {
          templateUrl: "templates/health_worker_table.html",
          controller: "PatientsCtrl"
        },
        "research-assistant-table@patients": {
          templateUrl: "templates/research_assistant_table.html",
          controller: "PatientsCtrl"
        }
      },
      data: {
        authorizedRoles: [USER_ROLES.asisstant, USER_ROLES.supervisor, USER_ROLES.chw]
      }
    })
})

.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  dev: 'dev',
  chw: 'Health Worker',
  supervisor: "Supervisor",
  researcher: 'Researcher',
  asisstant: 'Research Assistant',
  all: '*'
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.run(function ($rootScope, AUTH_EVENTS, AuthService) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (next.controller === 'LoginCtrl'){
      return
    }
    var authorizedRoles = next.data.authorizedRoles;
    if (!AuthService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (AuthService.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        // alert(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        // alert(AUTH_EVENTS.notAuthenticated);
      }
    }
  });
})


angular.module('starter.factories', [])

.factory('DataService', ['$http', 'localstorage', 'lastSync', function($http, localstorage, lastSync) {
  return {

    getSurveys: function () {
      $http.get("https://friendshipbench-staging.cbits.northwestern.edu/api/surveys")

      .success(function (data){

        p.nuke("surveyQuestions");
        _.each(data.surveys, function (question) {
            p.save("surveyQuestions", question);
        });

        alert("survey import successful");

      })
      .error(function (){
        alert("error -- survey import failed");
      })
    },

    syncUsers: function () {

      $http.get("https://friendshipbench-staging.cbits.northwestern.edu/api/users")

      .success(function (data){
        _.each(data.users, function (user) {
            p.save("users", user);
        });

        alert("user sync successful");
      })
      .error(function (err){
        alert("error -- user sync failed");
      });
    },

    syncData: function() {

      function importPatients(patients) {
        $http.get("https://friendshipbench-staging.cbits.northwestern.edu/api/participants")
        // $http.get("http://localhost:3000/api/participants")

        .success(function (data){
          p.nuke("participants");
          _.each(data.participants, function (patient) {
            p.save("participants", patient);
            console.log(patient);
          });
          alert("patient import successful");
          lastSync.update();
        })
        .error(function (data){
          alert("patient import failed")
        });
      };

      function exportPatients(patients) {
        $http({
          url: "https://friendshipbench-staging.cbits.northwestern.edu/api/participants",
          // url: "http://localhost:3000/api/participants",
          method: "POST",
          data: {"participants": patients},
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
         })
        .success(function (data){
          importPatients(patients);
          alert(data.res);
        })
        .error(function (data){
          alert("error -- patient sync failed");
        });
      };

      var participants = p.find("participants");

      if(participants.length > 0){
        exportPatients(participants);
      }
      else {
        importPatients(participants);
      }
    }
  }
}])

.factory('localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('AuthService', function (localstorage, Session, $cookieStore) {
  var authService = {};

  authService.login = function (credentials) {
    var user = _.first(p.find('users', {pin: credentials.pin, email: credentials.email}));
    if(!!user) {
      Session.create(user);
    }
    return user;
  };

  authService.isAuthenticated = function () {
    return !!$cookieStore.get('user');
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf($cookieStore.get('user').role) !== -1);
  };

  return authService;
});

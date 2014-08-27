angular.module('starter.services', [])

.factory('DataService', ['$http', '$log', 'localstorage', function($http, $log, localstorage) {
  return {
         sync: function () {
            $http.defaults.useXDomain = true;
            $http.get("http://friendshipbench-staging.cbits.northwestern.edu/api/users")
            .success(function (data){

              _.each(data, function (user) {
                localstorage.setObject("users", user);
              });
              
            })
            .error(function (data){
              alert("error -- sync failed");
            });
         }
      }
  }
])

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

.factory('AuthService', ['localstorage', function(localstorage) {
  var authService = {};

  authService.login = function (pin) {
    
  }
}]);

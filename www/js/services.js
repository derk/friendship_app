angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('DataService', ['$http', function($http, $log) {
  return {
         sync: function () {
            $http.get("http://conemo.northwestern.edu/api/dialogs.json")
            .success(function (data){
              alert("Got data");
              $log.info(data);
            })
            .error(function (data){
              $log.info("error");
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
}]);

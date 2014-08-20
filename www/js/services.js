angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('DataService', ['$http', '$log', function($http, $log) {
  return {
         sync: function () {
            $http.get("http://www.corsproxy.com/conemo.northwestern.edu/api/dialogues.json")
            .success(function (data){
              alert("Got data");
              $log.info(data);
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
}]);

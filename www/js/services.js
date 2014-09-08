angular.module('starter.services', [])

.factory('DataService', ['$http', 'localstorage', function($http, localstorage) {
  return {
    syncUsers: function () {

      $http.get("https://friendshipbench-staging.cbits.northwestern.edu/api/users")
      
      .success(function (data){
        _.each(data.users, function (user) {
            p.save("users", user);
        });
        var now = new Date();
        localstorage.set("lastSync", now)
        alert("user sync successful");    
      })
      .error(function (err){
        alert("error -- user sync failed");
      });
    },
    syncData: function() {
      var participants = p.find("participants");

      if(participants.length > 0){
        $http({
          url: "http://localhost:3000/api/participants",
          method: "POST",
          data: {"participants": participants},
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
         })
        .success(function (data){
          alert(data.res);
        })
        .error(function (data){
          alert(data.error);
        })
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

.factory('AuthService', function (localstorage, Session) {
  var authService = {};
 
  authService.login = function (credentials) {
    var user = _.first(p.find('users', {pin: credentials.pin}));
    if(!!user) {
      Session.create(user.username, user.guid, user.role);
    }
    return user;
  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
})

.service('Session', function (localstorage) {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
  return this;
})

.service('GuidMaker', function(){
    this.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
    };
    this.guid = function() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
               this.s4() + '-' + this.s4() + this.s4() + this.s4();
    };
    return this;
})

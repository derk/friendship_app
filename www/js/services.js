angular.module('starter.services', [])

.service('lastSync', ['$rootScope', 'localstorage', function ($rootScope, localstorage){
  return {
    update: function () {
      var now = new Date();
      localstorage.set("lastSync", now);
      console.log("lastSync updated");
      $rootScope.$broadcast("synced!")
    },
    get: function () {
      return localstorage.get("lastSync", null);
    }
  }
}])

.service('Session', function ($rootScope, $cookieStore) {
  return {
    create: function (user) {
      $cookieStore.put('user', user);
      $rootScope.$broadcast("userChanged");
    },
    destroy: function () {
      $cookieStore.put('user', null);
      $rootScope.$broadcast("userChanged");
    },
    currentUser: function() {
     return $cookieStore.get('user')
    }
  }
})

.service('ScopedParticipants', function () {
  this.participants = function (currentUser) {
    switch (currentUser.role) {
      case "Health Worker":
        return p.find('participants', {health_worker_guid: currentUser.guid});
        break;
      case "Research Assistant":
        return p.find('participants', {research_assistant_guid: currentUser.guid});
        break;
      case "Supervisor":
        return p.find('participants');
        break;
      default:
        alert('You are not authorized to manage any patients.');
    }
  }
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
});

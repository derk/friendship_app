angular.module('starter.services', [])

.service('lastSync', ['localstorage', function(localstorage){
  this.update = function () {
    var now = new Date();
    localstorage.set("lastSync", now);
    console.log("lastSync updated");
  };
  return this;
}])

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
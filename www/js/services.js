angular.module('friendshipBench.services', [])

.service('lastSync', ['$rootScope', 'localstorage', function ($rootScope, localstorage){
  return {
    update: function () {
      var now = moment();
      var now = now.format("M-D-YYYY h:mm a")
      localstorage.set("lastSync", now);
      console.log("lastSync updated");
      $rootScope.$broadcast("synced!")
    },
    get: function () {
      return localstorage.get("lastSync", null);
    }
  }
}])

.service('Session', function ($rootScope, localstorage) {
  return {
    create: function (user) {
      localstorage.setObject('user', user);
      $rootScope.$broadcast("userChanged");
    },
    destroy: function () {
      localstorage.setObject('user', null);
      $rootScope.$broadcast("userChanged");
    },
    currentUser: function() {
     return localstorage.getObject('user');
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
})

.service('ClientIdMaker', function () {
  return {
    makeID: function (clinic) {

      function randString() {
            var text = "";
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 4; i++ )
                text += characters.charAt(Math.floor(Math.random() * characters.length));
            return text;
      }

      var date = new Date();
      var clientId = clinic + '-' + date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear() + '-' + randString();
      return clientId;
    }
  }
})

.service('surveyService', function () {
    return {
      getScreening: function() {
         return _.first(_.where(p.find("groups")[0], {group_name: "Screening"}));
      },
      getBaseline: function() {
          return _.first(_.where(p.find("groups")[0], {group_name: "Baseline/3/6"}));
      }
    }
})

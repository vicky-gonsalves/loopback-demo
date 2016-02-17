angular
  .module('app')
  .factory('AuthService', ['User', '$q', '$rootScope', '$cookies', '$location', 'LoopBackAuth', '$http', '$timeout', function(User, $q, $rootScope, $cookies, $location, LoopBackAuth, $http, $timeout) {
    var currentUser = {};

    if ((!$cookies.get('access_token')) && $location.path() !== '/logout') {
      User.getCurrent(function(user) {
        currentUser = user;
      });
    }
    return {
      login: function(credentials, callback) {
        LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        User.login(credentials, function() {
          currentUser = User.getCurrent(function(user) {
            deferred.resolve(user);
          });
        }, function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

      logout: function() {
        return User.logout().$promise
          .then(function(value) {
            currentUser = {};
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            $cookies.remove('access_token');
            $cookies.remove('userId');
          });
      },
      register: function(user) {
        return User.create(user).$promise;
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        return User.isAuthenticated();
      },

      /**
       * Gets all available info on authenticated user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('id');
      },

      /**
       * Change Password
       */
      changePassword: function() {
        return currentUser.hasOwnProperty('id');
      },

      ensureHasCurrentUser: function(cb) {
        if ((!currentUser.id) && $cookies.get('access_token')) {
          LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
          $http.get('/auth/current')
            .then(function(response) {
              if (response.data.id) {
                LoopBackAuth.currentUserId = response.data.id;
                LoopBackAuth.accessTokenId = $cookies.get('access_token').substring(2, 66);
              }
              if (LoopBackAuth.currentUserId === null) {
                $cookies.remove('access_token');
                $cookies.remove('userId');
                LoopBackAuth.accessTokenId = null;
              }
              LoopBackAuth.save();
              currentUser = response.data;
              var profile = currentUser && currentUser.profiles && currentUser.profiles.length && currentUser.profiles[0];
              if (profile) {
                currentUser.name = currentUser.profiles[0].profile.displayName;
                currentUser.provider = currentUser.profiles[0].profile.provider;
              }
              cb(currentUser);
            }, function() {
              console.log('User.getCurrent() err', arguments);
              LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
              LoopBackAuth.save();
              cb({});
            });
        } else {
          console.log('Using cached current user.');
          cb(currentUser);
        }
      }
    };
  }]);

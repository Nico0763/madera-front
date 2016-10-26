(function() {
    /*jshint camelcase: false */
    'use strict';

    angular
        .module('main')
        .factory('AuthServerProvider', AuthServerProvider);

    AuthServerProvider.$inject = ['$http', '$localStorage', 'Base64', 'Config', '$ionicHistory'];

    function AuthServerProvider ($http, $localStorage, Base64, Config, $ionicHistory) {
        var service = {
            getToken: getToken,
            hasValidToken: hasValidToken,
            login: login,
            logout: logout
        };

        return service;

        function getToken () {
            return $localStorage.authenticationToken;
        }

        function hasValidToken () {
            var token = this.getToken();
            return token && token.expires_at && token.expires_at > new Date().getTime();
        }

        function login (credentials) {
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            var data = 'username=' +  encodeURIComponent(credentials.username) + '&password=' +
                encodeURIComponent(credentials.password) + '&grant_type=password&scope=read%20write&' +
                'client_secret=my-secret-token-to-change-in-production&client_id=maderaapp';

            return $http.post(Config.ENV.SERVER_URL + 'oauth/token', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + Base64.encode('maderaapp:' + 'my-secret-token-to-change-in-production')
                }
            }).success(authSucess);

            function authSucess (response) {
                var expiredAt = new Date();
                expiredAt.setSeconds(expiredAt.getSeconds() + response.expires_in);
                response.expires_at = expiredAt.getTime();
                $localStorage.authenticationToken = response;
                return response;
            }
        }

        function logout () {
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $http.post(Config.ENV.SERVER_URL + 'api/logout').then(function() {
                delete $localStorage.authenticationToken;
            });
        }
    }
})();

(function() {
    'use strict';
    angular
        .module('main')
        .factory('Commands_push', Commands_push);

    Commands_push.$inject = ['$resource', 'Config'];

    function Commands_push ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/commands/push';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                },
                isArray:true
            },
            'update': { method:'PUT' }
        });
    }
})();
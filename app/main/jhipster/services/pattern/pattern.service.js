(function() {
    'use strict';
    angular
        .module('main')
        .factory('Pattern', Pattern);

    Pattern.$inject = ['$resource', 'Config'];

    function Pattern ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/patterns/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

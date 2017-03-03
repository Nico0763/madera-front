(function() {
    'use strict';
    angular
        .module('main')
        .factory('PatternByAssortment', PatternByAssortment);

    PatternByAssortment.$inject = ['$resource', 'Config'];

    function PatternByAssortment ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/patterns/assortment/:id';

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
(function() {
    'use strict';
    angular
        .module('main')
        .factory('GetAssortments', GetAssortments);

    GetAssortments.$inject = ['$resource', 'Config'];

    function GetAssortments ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + '/api/assortments';

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
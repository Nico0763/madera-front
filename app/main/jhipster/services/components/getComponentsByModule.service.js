(function() {
    'use strict';
    angular
        .module('main')
        .factory('GetComponentsByModule', GetComponentsByModule);

    GetComponentsByModule.$inject = ['$resource', 'Config'];

    function GetComponentsByModule ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + '/api/module_components/module/:id';

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
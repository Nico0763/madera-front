(function() {
    'use strict';
    angular
        .module('main')
        .factory('GetCustomers', GetCustomers);

    GetCustomers.$inject = ['$resource', 'Config'];

    function GetCustomers ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + '/api/customers';

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
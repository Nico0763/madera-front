(function() {
    'use strict';
    angular
        .module('main')
        .factory('GetProductsByPattern', GetProductsByPattern);

    GetProductsByPattern.$inject = ['$resource', 'Config'];

    function GetProductsByPattern ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/products/pattern/:id';

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
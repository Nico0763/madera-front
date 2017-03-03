(function() {
    'use strict';
    angular
        .module('main')
        .factory('GetComponentsByProduct', GetComponentsByProduct);

    GetComponentsByProduct.$inject = ['$resource', 'Config'];

    function GetComponentsByProduct ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + '/api/component_product/product/:id';

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
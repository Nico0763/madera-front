(function() {
    'use strict';
    angular
        .module('main')
        .factory('Component_product', Component_product);

    Component_product.$inject = ['$resource', 'Config'];

    function Component_product ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/component-products';

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
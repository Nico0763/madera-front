(function() {
    'use strict';
    angular
        .module('main')
        .factory('ProductDependencies', ProductDependencies);

    ProductDependencies.$inject = ['$resource','Config'];

    function ProductDependencies ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/products/dependencies/:id';

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

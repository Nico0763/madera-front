(function() {
    'use strict';
    angular
        .module('main')
        .factory('Product', Product);

    Product.$inject = ['$resource','Config'];

    function Product ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/products/:id';

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

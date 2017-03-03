(function() {
    'use strict';
    angular
        .module('main')
        .factory('GetProductsByQuotation', GetProductsByQuotation);

    GetProductsByQuotation.$inject = ['$resource', 'Config'];

    function GetProductsByQuotation ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/products/quotation/:id';

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
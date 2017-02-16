(function() {
    'use strict';
    angular
        .module('main')
        .factory('Quotation', Quotation);

    Quotation.$inject = ['$resource', 'Config'];

    function Quotation ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/quotations';

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
(function() {
    'use strict';
    angular
        .module('main')
        .factory('GetDeadlinesByQuotation', GetDeadlinesByQuotation);

    GetDeadlinesByQuotation.$inject = ['$resource', 'Config'];

    function GetDeadlinesByQuotation ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + '/api/deadlines/quotation/:id';

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
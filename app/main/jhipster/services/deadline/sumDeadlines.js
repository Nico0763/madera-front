(function() {
    'use strict';
    angular
        .module('main')
        .factory('SumDeadlines', SumDeadlines);

    SumDeadlines.$inject = ['$resource', 'Config'];

    function SumDeadlines ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + '/api/deadline/sum/quotation/:id';

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
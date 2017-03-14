(function() {
    'use strict';
    angular
        .module('main')
        .factory('Principal_cross_section', Principal_cross_section);

    Principal_cross_section.$inject = ['$resource','Config'];

    function Principal_cross_section ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/principal-cross-sections/:id';

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

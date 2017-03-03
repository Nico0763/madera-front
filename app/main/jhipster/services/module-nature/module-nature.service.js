(function() {
    'use strict';
    angular
        .module('main')
        .factory('Module_nature', Module_nature);

    Module_nature.$inject = ['$resource', 'Config'];

    function Module_nature ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/module-natures/:id';

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

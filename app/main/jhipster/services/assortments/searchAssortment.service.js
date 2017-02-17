(function() {
    'use strict';
    angular
        .module('main')
        .factory('searchAssortment', searchAssortment);

    searchAssortment.$inject = ['$resource', 'DateUtils', 'Config'];

    function searchAssortment ($resource, DateUtils, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/assortments/search/:critere';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

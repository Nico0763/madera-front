(function() {
    'use strict';
    angular
        .module('main')
        .factory('searchQuotation', searchQuotation);

    searchQuotation.$inject = ['$resource', 'DateUtils', 'Config'];

    function searchQuotation ($resource, DateUtils, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/quotations/search/:critere';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

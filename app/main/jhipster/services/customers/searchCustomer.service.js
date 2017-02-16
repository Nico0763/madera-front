(function() {
    'use strict';
    angular
        .module('main')
        .factory('searchCustomer', searchCustomer);

    searchCustomer.$inject = ['$resource', 'DateUtils', 'Config'];

    function searchCustomer ($resource, DateUtils, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/customers/search/:critere';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

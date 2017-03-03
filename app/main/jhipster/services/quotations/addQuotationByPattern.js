(function() {
    'use strict';
    angular
        .module('main')
        .factory('AddQuotationByPattern', AddQuotationByPattern);

    AddQuotationByPattern.$inject = ['$resource', 'Config', 'DateUtils'];

    function AddQuotationByPattern ($resource, Config,DateUtils) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/quotations/pattern';

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
            'update': { method:'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.date = DateUtils.convertLocalDateToServer(copy.date);
                    return angular.toJson(copy);
                } }
        });
    }
})();
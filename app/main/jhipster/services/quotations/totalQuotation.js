(function() {
    'use strict';
    angular
        .module('main')
        .factory('TotalQuotation', TotalQuotation);

    TotalQuotation.$inject = ['$resource', 'Config', 'DateUtils'];

    function TotalQuotation ($resource, Config,DateUtils) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/quotation/total/:id';

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
            'update': { method:'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.date = DateUtils.convertLocalDateToServer(copy.date);
                    return angular.toJson(copy);
                } }
        });
    }
})();
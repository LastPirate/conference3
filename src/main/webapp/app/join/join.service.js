(function() {
    'use strict';
    angular
        .module('conference3App')
        .factory('Visit', Visit);

    Visit.$inject = ['$resource'];

    function Visit ($resource) {
        var resourceUrl =  'api/visits/:id';

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

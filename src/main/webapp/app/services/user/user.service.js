(function () {
    'use strict';

    angular
        .module('conference3App')
        .factory('User', User)
        .factory('joinCurrentUserProperties', joinCurrentUserProperties);

    User.$inject = ['$resource'];
    joinCurrentUserProperties.$inject = ['$resource'];

    function User ($resource) {
        var service = $resource('api/users/:login', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
        });

        return service;
    }

    function joinCurrentUserProperties ($resource) {
        var resourceUrl =  'api//users/authCurrentUser';

        return $resource(resourceUrl, {}, {
            'get': {
                method: 'GET',
                isArray: true,
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
        });
    }
})();

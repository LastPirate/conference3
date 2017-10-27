(function() {
    'use strict';
    angular
        .module('conference3App')
        .factory('Event', Event)
        .factory('getCurrentUserEvents', getCurrentUserEvents);

    Event.$inject = ['$resource', 'DateUtils'];
    getCurrentUserEvents.$inject = ['$resource'];

    function Event ($resource, DateUtils) {
        var resourceUrl =  'api/events/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.start = DateUtils.convertDateTimeFromServer(data.start);
                        data.end = DateUtils.convertDateTimeFromServer(data.end);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }

    function getCurrentUserEvents ($resource) {
        var resourceUrl =  'api/events/currentUser';

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

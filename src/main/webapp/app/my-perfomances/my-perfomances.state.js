(function() {
    'use strict';

    angular
        .module('conference3App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('my-perfomances', {
                parent: 'app',
                url: '/my-perfomances',
                data: {
                    authorities: ['ROLE_ADMIN','ROLE_PRESENTER'],
                    pageTitle: 'conference3App.event.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/my-perfomances/my-perfomances.html',
                        controller: 'EventController',
                    },
                    'press@my-perfomances': {
                        templateUrl: 'app/entities/presentation/presentations.html',
                        controller: 'PresentationsController',
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('event');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
    }
})();

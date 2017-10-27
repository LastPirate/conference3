(function() {
    'use strict';

    angular
        .module('conference3App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/',
            data: {
                pageTitle: 'conference3App.event.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/home/home.html',
                    controller: 'RoomController',
                    controllerAs: 'rm'
                },
                'viewEvent@home': {
                    controller: 'EventController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('event');
                    $translatePartialLoader.addPart('room');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
    }
})();

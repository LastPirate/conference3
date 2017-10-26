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
                authorities: ['ROLE_USER'],
            },
            views: {
                'content@': {
                    templateUrl: './app/my-perfomances/my-perfomances.html',
                },
                'forEvent@my-perfomances': {
                    controller: 'EventController',
                    controllerAs: 'vm'
                },
                'forPresentation@my-perfomances': {
                    controller: 'PresentationController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('event');
                    $translatePartialLoader.addPart('presentation');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
    }
})();

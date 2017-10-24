(function() {
    'use strict';

    angular
        .module('conference3App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('join', {
            parent: 'app',
            url: '/join',
            data: {
                authorities: [],
                pageTitle: 'global.menu.join'
            },
            views: {
                'content@': {
                    templateUrl: 'app/join/join.html',
                    controller: 'JoinController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('join');
                    return $translate.refresh();
                }]
            }
        });
    }
})();

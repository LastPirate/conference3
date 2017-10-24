(function() {
    'use strict';

    angular
        .module('conference3App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('my-perfomances', {
            parent: 'app',
            url: '/my-perfomances',
            data: {
                authorities: [],
                pageTitle: 'global.menu.my-perfomances'
            },
            views: {
                'content@': {
                    templateUrl: 'app/my-perfomances/my-perfomances.html',
                    controller: 'MyPerfomancesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('my-perfomances');
                    return $translate.refresh();
                }]
            }
        });
    }
})();

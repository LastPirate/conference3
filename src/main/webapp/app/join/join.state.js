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
                authorities: ['ROLE_USER']
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/visit/visit-dialog.html',
                    controller: 'JoinDialogController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('visit');
                    return $translate.refresh();
                }],
                entity: function () {
                    return {
                        presenterStatus: null,
                        id: null
                    };
                }
            }
        })
    }
})();

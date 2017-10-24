(function() {
    'use strict';

    angular
        .module('conference3App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('visit', {
            parent: 'entity',
            url: '/visit',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'conference3App.visit.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/visit/visits.html',
                    controller: 'VisitController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('visit');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('visit-detail', {
            parent: 'visit',
            url: '/visit/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'conference3App.visit.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/visit/visit-detail.html',
                    controller: 'VisitDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('visit');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Visit', function($stateParams, Visit) {
                    return Visit.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'visit',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('visit-detail.edit', {
            parent: 'visit-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/visit/visit-dialog.html',
                    controller: 'VisitDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Visit', function(Visit) {
                            return Visit.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('visit.new', {
            parent: 'visit',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/visit/visit-dialog.html',
                    controller: 'VisitDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                presenterStatus: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('visit', null, { reload: 'visit' });
                }, function() {
                    $state.go('visit');
                });
            }]
        })
        .state('visit.edit', {
            parent: 'visit',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/visit/visit-dialog.html',
                    controller: 'VisitDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Visit', function(Visit) {
                            return Visit.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('visit', null, { reload: 'visit' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('visit.delete', {
            parent: 'visit',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/visit/visit-delete-dialog.html',
                    controller: 'VisitDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Visit', function(Visit) {
                            return Visit.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('visit', null, { reload: 'visit' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

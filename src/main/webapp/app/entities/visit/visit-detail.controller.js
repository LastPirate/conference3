(function() {
    'use strict';

    angular
        .module('conference3App')
        .controller('VisitDetailController', VisitDetailController);

    VisitDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Visit', 'User', 'Event'];

    function VisitDetailController($scope, $rootScope, $stateParams, previousState, entity, Visit, User, Event) {
        var vm = this;

        vm.visit = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('conference3App:visitUpdate', function(event, result) {
            vm.visit = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

(function() {
    'use strict';

    angular
        .module('conference3App')
        .controller('PresentationDetailController', PresentationDetailController);

    PresentationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Presentation', 'Event'];

    function PresentationDetailController($scope, $rootScope, $stateParams, previousState, entity, Presentation, Event) {
        var vm = this;

        vm.presentation = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('conference3App:presentationUpdate', function(event, result) {
            vm.presentation = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

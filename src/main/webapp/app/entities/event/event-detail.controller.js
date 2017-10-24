(function() {
    'use strict';

    angular
        .module('conference3App')
        .controller('EventDetailController', EventDetailController);

    EventDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Event', 'Visit', 'Room', 'Presentation'];

    function EventDetailController($scope, $rootScope, $stateParams, previousState, entity, Event, Visit, Room, Presentation) {
        var vm = this;

        vm.event = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('conference3App:eventUpdate', function(event, result) {
            vm.event = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

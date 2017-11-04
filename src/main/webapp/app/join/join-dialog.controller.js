(function() {
    'use strict';

    angular
        .module('conference3App')
        .controller('JoinDialogController', JoinDialogController);

    JoinDialogController.$inject = ['$timeout', '$scope', '$state', '$stateParams', 'entity', 'Visit', 'User', 'Event', 'joinCurrentUserProperties'];

    function JoinDialogController ($timeout, $scope, $state, $stateParams, entity, Visit, User, Event, joinCurrentUserProperties) {
        var vm = this;

        vm.visit = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();
        vm.events = Event.query();
        vm.userProperties = joinCurrentUserProperties.get(function (result) {
               return result;
            }
        );

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $state.go('home', {}, { reload: true });
        }

        function save () {
            vm.users.get
            vm.isSaving = true;
            if (vm.visit.id !== null) {
                Visit.update(vm.visit, onSaveSuccess, onSaveError);
            } else {
                Visit.save(vm.visit, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('conference3App:visitUpdate', result);
            $state.go('home', {}, { reload: true });
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

    }
})();

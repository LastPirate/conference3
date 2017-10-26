(function() {
    'use strict';

    angular
        .module('conference3App')
        .controller('JoinDialogController', JoinDialogController);

    JoinDialogController.$inject = ['$timeout', '$scope', '$state', '$stateParams', 'entity', 'Visit', 'User', 'Event'];

    function JoinDialogController ($timeout, $scope, $state, $stateParams, entity, Visit, User, Event) {
        var vm = this;

        vm.visit = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();
        vm.events = Event.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $state.go('home', null, { reload: 'visit' });
        }

        function save () {
            vm.isSaving = true;
            if (vm.visit.id !== null) {
                Visit.update(vm.visit, onSaveSuccess, onSaveError);
            } else {
                Visit.save(vm.visit, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('conference3App:visitUpdate', result);
            vm.isSaving = false;
            $state.go('join', null, { reload: 'visit' });
        }

        function onSaveError () {
            vm.isSaving = false;
        }

    }
})();

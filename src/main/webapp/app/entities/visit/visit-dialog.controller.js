(function() {
    'use strict';

    angular
        .module('conference3App')
        .controller('VisitDialogController', VisitDialogController);

    VisitDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Visit', 'User', 'Event'];

    function VisitDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Visit, User, Event) {
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
            $uibModalInstance.dismiss('cancel');
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
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

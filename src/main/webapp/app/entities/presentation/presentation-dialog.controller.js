(function() {
    'use strict';

    angular
        .module('conference3App')
        .controller('PresentationDialogController', PresentationDialogController);

    PresentationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Presentation', 'Event'];

    function PresentationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Presentation, Event) {
        var vm = this;

        vm.presentation = entity;
        vm.clear = clear;
        vm.save = save;
        vm.events = Event.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.presentation.id !== null) {
                Presentation.update(vm.presentation, onSaveSuccess, onSaveError);
            } else {
                Presentation.save(vm.presentation, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('conference3App:presentationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

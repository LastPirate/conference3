(function() {
    'use strict';

    angular
        .module('conference3App')
        .controller('PresentationDeleteController',PresentationDeleteController);

    PresentationDeleteController.$inject = ['$uibModalInstance', 'entity', 'Presentation'];

    function PresentationDeleteController($uibModalInstance, entity, Presentation) {
        var vm = this;

        vm.presentation = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Presentation.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

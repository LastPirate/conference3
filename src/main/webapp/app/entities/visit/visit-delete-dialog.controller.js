(function() {
    'use strict';

    angular
        .module('conference3App')
        .controller('VisitDeleteController',VisitDeleteController);

    VisitDeleteController.$inject = ['$uibModalInstance', 'entity', 'Visit'];

    function VisitDeleteController($uibModalInstance, entity, Visit) {
        var vm = this;

        vm.visit = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Visit.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

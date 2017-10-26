(function() {
    'use strict';

    angular
        .module('conference3App')
        .controller('MyPerfomancesController', MyPerfomancesController);

    MyPerfomancesController.$inject = ['ParseLinks', 'AlertService', 'paginationConstants'];

    function MyPerfomancesController(paginationConstants) {

    }
})();

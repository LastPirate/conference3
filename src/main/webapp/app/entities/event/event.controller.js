(function() {
    'use strict';

    angular
        .module('conference3App')
        .controller('EventController', EventController);

    EventController.$inject = ['$scope', 'Event', 'ParseLinks', 'AlertService', 'paginationConstants', 'getCurrentUserEvents'];

    function EventController($scope, Event, ParseLinks, AlertService, paginationConstants, getCurrentUserEvents) {

        var vm = this;

        vm.events = [];
        vm.loadPage = loadPage;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.page = 0;
        vm.links = {
            last: 0
        };
        vm.predicate = 'id';
        vm.reset = reset;
        vm.reverse = true;

        $scope.currentEvents = getCurrentUserEvents.get(function (result) {
                return result;
            }
        );

        $scope.joinable=function (eventCollections, key, value) {
            var result=[];
            for (var i = 0, count = eventCollections.length; i < count; i++) {
                if (key == "presentation" && value == eventCollections[i].presentation.title ||
                key == "room" && value == eventCollections[i].room.number ||
                key == "time" && value == eventCollections[i].start) result.push(eventCollections[i]);
            }
            return result;
        };

        $scope.uniqueValues = function (eventCollections, paramOfEvent) {
            var result=[];
            for (var i = 0, count = eventCollections.length; i < count; i++) {
                var unique = true;
                for (var j = 0, countResult = result.length; j < countResult; j++) {
                    if (paramOfEvent == "presentation" && eventCollections[i].presentation.title == result[j] ||
                    paramOfEvent == "room" && eventCollections[i].room.number == result[j] ||
                    paramOfEvent == "time" && eventCollections[i].start == result[j]) unique = false;
                }
                if (unique) {
                    if (paramOfEvent == "presentation") result.push(eventCollections[i].presentation.title);
                    else if (paramOfEvent == "room") result.push(eventCollections[i].room.number);
                    else if (paramOfEvent == "time") result.push(eventCollections[i].start);
                }
            }
            return result;
        };

        loadAll();

        function loadAll () {
            Event.query({
                page: vm.page,
                size: vm.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }

            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                for (var i = 0; i < data.length; i++) {
                    vm.events.push(data[i]);
                }
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function reset () {
            vm.page = 0;
            vm.events = [];
            loadAll();
        }

        function loadPage(page) {
            vm.page = page;
            loadAll();
        }
    }
})();

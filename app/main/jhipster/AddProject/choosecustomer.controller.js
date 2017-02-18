(function() {
    'use strict';

    angular
        .module('main')
        .controller('ChooseCustomerController',ChooseCustomerController);

   ChooseCustomerController.$inject = ['$timeout', '$scope', '$stateParams', 'DataUtils', 'searchCustomer', 'GetCustomers', '$ionicConfig', '$state','ParseLinks', 'Quotation', '$ionicLoading', '$rootScope'];

    function ChooseCustomerController ($timeout, $scope, $stateParams, DataUtils, searchCustomer, GetCustomers,  $ionicConfig, $state,ParseLinks, Quotation, $ionicLoading, $rootScope) {
        var vm = this;
         //A appeler dans les autre state pour réactiver la transition
        $ionicConfig.views.transition('none');

        //////////////////////////
        // Controller variables //
        //////////////////////////

        /**
         * The controller reference 
         * @type {Object}
         */
        vm.loadPage = loadPage;
        vm.predicate = 'id';
        vm.reverse = 'asc';
        vm.transition = transition;
        vm.itemsPerPage = 6;
        vm.search = search;
        vm.resetpage = resetPage;
        vm.nbPages = 1;

        vm.searchBox = $state.params.search;
        vm.stateSearch = $state.params.search;
        vm.selectCustomer = selectCustomer;
        vm.goBack = goBack;
        vm.goSearch = goSearch;



        if($state.params.search=="" || $state.params.search == null)
            loadAll();
        else
            search();

        $scope.getNumber = function(num) {

            var numbers = [];
            for(var i=1;i<=num;i++)
                numbers.push(i);

            return numbers;  
        }
        function loadAll () {

           
           GetCustomers.query({
                page: $state.params.page - 1,
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
                vm.queryCount = vm.totalItems;
                vm.customers = data;
                vm.page = $state.params.page;
                vm.nbPages = Math.ceil(vm.queryCount/vm.itemsPerPage);
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }
        
        function loadPage (page) {
            vm.page = page;
            vm.transition();
        }




        function transition () {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }


         /*** Recherche ***/
        function search()
        {
            console.log("search");

           var search = $state.params.search;



         
           if(search!="" && search != null)
           {



             searchCustomer.query({
                critere: search,
                page:  $state.params.page - 1,
                size: vm.itemsPerPage,
                sort: sort()
            },onSuccess, onError);

            
           }
           else 
           {
            resetPage();
            loadAll();
           }
            

            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'desc' : 'asc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
               // console.log(headers('link'));
                vm.currentSearch = search;
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.customers = data;
                vm.page = $state.params.page;
                vm.nbPages = Math.ceil(vm.queryCount/vm.itemsPerPage);
            }
            function onError(error) {
               console.log(error);
            }
        }

        function resetPage()
        {
            $state.params.page=1;
            $state.params.search = null;
            vm.page = 1;
        }
        function selectCustomer(customer)
        {
            $rootScope.quotation.customer = customer;
            $state.go('add_chooseassortment');
        }

        function goBack()
        {
             $state.go('addproject');
        }

        function goSearch()
        {
             $state.go("add_choosecustomer", {page:1,search:vm.searchBox});
        }

      
    }
})();

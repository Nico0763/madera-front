(function()
{
	'use strict';
	angular
		.module('main')
		.controller('CustomerManagerController', CustomerManagerController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	CustomerManagerController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope', 'GetCustomers','ParseLinks','$ionicConfig','searchCustomer', '$ionicLoading', 'Customer', '$ionicPopup'];

	/**
	 * The index page controller
	 * @param {[type]} $scope                 Scope module
	 * @param {[type]} $filter                Filter module
	 * @param {[type]} Principal              Principal module
	 * @param {[type]} $state                 State module
	 * @param {[type]} $location              Location module
	 * @param {[type]} $ionicNavBarDelegate   IonicNavBarDelegate module
	 * @param {[type]} Config                 Config module
	 * @param {[type]} $ionicSideMenuDelegate IonicSideMenuDelegate module
	 * @param {[type]} $rootScope             RootScope module
	 * @param {[type]} PostSession            PostSession service
	 * @param {[type]} GetTour                GetTour service
	 * @param {[type]} GetTours               GetTours service
	 * @param {[type]} $ionicLoading          IonicLoading module
	 */
	function CustomerManagerController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope, GetCustomers, ParseLinks, $ionicConfig, searchCustomer, $ionicLoading, Customer, $ionicPopup)
	{
		///////////////
		// VARIABLES //
		///////////////



        //A appeler dans les autre state pour réactiver la transition
        $ionicConfig.views.transition('none');

		//////////////////////////
		// Controller variables //
		//////////////////////////

		/**
		 * The controller reference
		 * @type {Object}
		 */
		var vm = this;
		vm.loadPage = loadPage;
        vm.predicate = 'id';
        vm.reverse = 'asc';
        vm.transition = transition;
        vm.itemsPerPage = 3;
        vm.search = search;
        vm.resetpage = resetPage;
        vm.nbPages = 1;

        vm.searchBox = $state.params.search;
        vm.stateSearch = $state.params.search;
        vm.editCustomer = editCustomer;
        vm.addCustomer = addCustomer;
        vm.removeCustomer = removeCustomer;

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

        /*** Actions sur le devis ***/

        function editCustomer(customer)
        {
            console.debug(customer);
             $rootScope.customer =  customer;
             $state.go('editcustomer', {id:customer.id}, {reload:true});
        }


        function addCustomer()
        {
             $state.go('addcustomer', {reload:true});
        }

        function removeCustomer(c)
        {   
            $ionicLoading.show({
              template: 'Loading...'
            });
           Customer.delete({id:c.id},successRemove, errorRemove);
        }

        function successRemove(data)
        {
            $ionicLoading.hide()
            search();
        }

        function errorRemove()
        {
            $ionicLoading.hide()
            $ionicPopup.alert({
             title: 'Erreur de suppression',
             template: 'Le client possède des devis'
           });
        }


	}
})();
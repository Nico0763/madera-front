(function()
{
	'use strict';
	angular
		.module('main')
		.controller('IndexPageController', IndexPageController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	IndexPageController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope', 'GetQuotations','ParseLinks','$ionicConfig','searchQuotation'];

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
	function IndexPageController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope, GetQuotations, ParseLinks, $ionicConfig, searchQuotation)
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
        vm.editQuotation = editQuotation;

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
           GetQuotations.query({
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
                vm.quotations = data;
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

             searchQuotation.query({
                critere: search,
                page:  $state.params.page - 1,
                size: vm.itemsPerPage,
                sort: sort()
            },onSuccess, onError);

             function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'desc' : 'asc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
           }
           else
           {
            resetPage();
            loadAll();
           }
            

            function onSuccess(data, headers) {
               // console.log(headers('link'));
                vm.currentSearch = search;
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.quotations = data;
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

        function editQuotation(quot)
        {
             $rootScope.quotation =  quot;
             $state.go('indexquotation');
        }


		
			
	}
})();
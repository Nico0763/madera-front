(function()
{
	'use strict';
	angular
		.module('main')
		.controller('ChooseAssortmentController',ChooseAssortmentController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	ChooseAssortmentController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope','ParseLinks','$ionicConfig', '$ionicLoading','GetAssortments', 'searchAssortment'];

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
	function ChooseAssortmentController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope,  ParseLinks, $ionicConfig, $ionicLoading, GetAssortments, searchAssortment)
	{
		///////////////
		// VARIABLES //
		///////////////

    var vm = this;
    vm.predicate = 'id';
    vm.reverse = 'asc';

    vm.selectAssortment = selectAssortment;
  	vm.search = search;
    vm.resetpage = resetPage;
    vm.searchBox = $state.params.search;
    vm.stateSearch = $state.params.search;
    vm.goBack = goBack;
    vm.goSearch = goSearch;
    vm.currentAssortment = null;


    if($state.params.search=="" || $state.params.search == null)
            loadAll();
        else
            search();


    function loadAll () {
           GetAssortments.query({
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
                vm.assortments = data;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }


         /*** Recherche ***/
        function search()
        {


           var search = $state.params.search;



         
           if(search!="" && search != null)
           {

           	
             searchAssortment.query({
                critere: search,    
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
                vm.assortments = data;
            }
            function onError(error) {
               console.log(error);
            }
        }

        function resetPage()
        {
            $state.params.search = null;
        }

    function selectAssortment()
        {
            if(vm.currentAssortment!=null)
            {
                $rootScope.quotation.assortment = vm.currentAssortment;
                $state.go('editproject');
            }
        }

    
        function goBack()
        {
              $state.go('add_choosecustomer');
        }

        function goSearch()
        {
           
             $state.go("add_chooseassortment", {page:1,search:vm.searchBox});
        }
	}
})();
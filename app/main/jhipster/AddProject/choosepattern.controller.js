(function()
{
	'use strict';
	angular
		.module('main')
		.controller('ChoosePatternController',ChoosePatternController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	ChoosePatternController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope','ParseLinks','$ionicConfig', '$ionicLoading', 'PatternByAssortment', '$ionicSlideBoxDelegate', 'AddQuotationByPattern', 'Quotation'];

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
	function ChoosePatternController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope,  ParseLinks, $ionicConfig, $ionicLoading, PatternByAssortment, $ionicSlideBoxDelegate, AddQuotationByPattern, Quotation)
	{
		///////////////
		// VARIABLES //
		///////////////

    var vm = this;

    vm.goBack = goBack;
    vm.patterns = null;
    vm.crtPattern = null;
    vm.patternInformations = patternInformations;
    vm.save = save;

    if($rootScope.quotation.assortment != null)
     loadAll();


    function loadAll () {

           PatternByAssortment.query({
                id:$rootScope.quotation.assortment.id
            }, onSuccess, onError);

            function onSuccess(data, headers) {
                vm.patterns = data;
                $ionicSlideBoxDelegate.update();
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
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
              $state.go('add_chooseassortment');
        }

        function patternInformations()
        {
        	if(vm.crtPattern != null)
        	{
	        	$ionicLoading.show({
	              template: 'Loading...'
	            });

	           $state.go('add_choosepattern.infos', {id:vm.crtPattern.id});
	       }
        }

        function save()
        {
            //Définir la nouvelle référence ici
            var date = new Date();
            var clientName = $rootScope.quotation.customer.name;
            var clientFirstname = $rootScope.quotation.customer.firstname;
            var month = (date.getUTCMonth() + 1).toString();
            if(month.length == 1)
                month = "0" + month;
            

            var reference = date.getUTCFullYear() + "-" + month + "-" +  clientName[0].toUpperCase() + clientName[1].toUpperCase() + "-" + clientFirstname[0].toUpperCase() + clientFirstname[1].toUpperCase();
console.log(reference);
            $rootScope.quotation.reference = reference;
            if(vm.crtPattern == null)
            {
                $rootScope.quotation.state = 1;
                Quotation.save($rootScope.quotation, successSave, errorSave);
            }
            else
            {
                AddQuotationByPattern.save({quotation:
                    {
                        reference:$rootScope.quotation.reference,
                        date:$rootScope.quotation.date,
                        name:$rootScope.quotation.name,
                        customer:$rootScope.quotation.customer,
                        state:1,
                        assortment:$rootScope.quotation.assortment,
                        commercial_percentage:0
                    },
                    id:vm.crtPattern.id},successSave, errorSave);
            }
        }

        function successSave(data)
        {
            $rootScope.quotation = data;
            $ionicLoading.hide();
            $state.go("indexquotation");
        }
        function errorSave(error)
        {
            $ionicLoading.hide();
            console.log(error);
        }


        vm.slideChanged = function(index)
        {
        	if(index==0)
        		vm.crtPattern = null;
        	else
        		vm.crtPattern = vm.patterns[index-1];
        }

	}



})();
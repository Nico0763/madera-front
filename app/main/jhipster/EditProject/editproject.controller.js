(function()
{
	'use strict';
	angular
		.module('main')
		.controller('EditProjectController', EditProjectController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	EditProjectController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope','ParseLinks','$ionicConfig', 'Quotation', '$ionicLoading','ionicDatePicker'];

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
	function EditProjectController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope,  ParseLinks, $ionicConfig, Quotation, $ionicLoading,ionicDatePicker)
	{
		///////////////
		// VARIABLES //
		///////////////



        //A appeler dans les autre state pour réactiver la transition
        $ionicConfig.views.transition('none');

		//////////////////////////
		// Controller variables //
		//////////////////////////


        $scope.states = [{
        value: 1,
        label: 'Brouillon'
      }, {
        value: 2,
        label: 'Accepté'
      }, {
        value: 3,
        label: 'En attente'
      }, {
        value: 4,
        label: 'Refusé'
      }, {
        value: 5,
        label: 'En commande'
      }, {
        value: 6,
        label: 'Transfert en facturation'
      }];


		/**
		 * The controller reference 
		 * @type {Object}
		 */
		var vm = this; 

		vm.datePickerOpenStatus = {};
        vm.quotation = JSON.parse(JSON.stringify($rootScope.quotation));
        vm.saveQuotation = saveQuotation;
        vm.goBack = goBack;

        function goBack()
        {
        	$state.go("indexquotation");
        }

        function saveQuotation()
        {
            $ionicLoading.show({
              template: 'Loading...'
            })
            Quotation.update(vm.quotation,function (data)
            {
                $rootScope.quotation = data;
                $ionicLoading.hide();
                $state.go('indexquotation');
            }, function(error)
            {
            	$ionicLoading.hide();
            });
        }

     

    $scope.openDatePicker = function(){

    	 var ipObj1 = {
      callback: function (val) {  //Mandatory
      		var date = new Date(val);
        	console.debug(vm.quotation);
       	 	vm.quotation.date = date;//date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
	      	console.debug(vm.quotation);
	      },
	      from: new Date(2012, 1, 1), //Optional
	      to: new Date(2020, 12, 31), //Optional
	      inputDate: new Date(vm.quotation.date),      //Optional
	      mondayFirst: true,          //Optional
	      disableWeekdays: [0],       //Optional
	      closeOnSelect: false,       //Optional
	      templateType: 'popup'       //Optional
	    };

      ionicDatePicker.openDatePicker(ipObj1);
    };


    $rootScope.$on('chooseCustomer', function(event, customer) {vm.quotation.customer = customer; });

    $rootScope.$on('chooseAssortment', function(event, assortment) {vm.quotation.assortment = assortment; });

	}
})();
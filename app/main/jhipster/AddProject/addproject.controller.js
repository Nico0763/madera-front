(function()
{
	'use strict';
	angular
		.module('main')
		.controller('AddProjectController', AddProjectController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	AddProjectController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope','ParseLinks','$ionicConfig', 'Quotation', '$ionicLoading','ionicDatePicker'];

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
	function AddProjectController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope,  ParseLinks, $ionicConfig, Quotation, $ionicLoading,ionicDatePicker)
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
        vm.quotation = $rootScope.quotation;
        vm.next = next;
        vm.goBack = goBack;

        function goBack()
        {
        	$state.go("indexquotation");
        }

        function next()
        {
           $state.go("add_choosecustomer");
        }

     

    $scope.openDatePicker = function(){



        var dateCalendar = new Date();
        if(vm.quotation != null)
          if(vm.quotation.date != null)
            dateCalendar = vm.quotation.date;

    	 var ipObj1 = {
      callback: function (val) {  //Mandatory
      		var date = new Date(val);
       	 	vm.quotation.date = date;//date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
	      },
	      from: new Date(2012, 1, 1), //Optional
	      to: new Date(2020, 12, 31), //Optional
	      inputDate: dateCalendar,      //Optional
	      mondayFirst: true,          //Optional
	      disableWeekdays: [0],       //Optional
	      closeOnSelect: false,       //Optional
	      templateType: 'popup'       //Optional
	    };

      ionicDatePicker.openDatePicker(ipObj1);
    };

	}
})();
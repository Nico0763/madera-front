(function()
{
	'use strict';
	angular
		.module('main')
		.controller('PaymentTermsController', PaymentTermsController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	PaymentTermsController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope','ParseLinks','$ionicConfig'];
 
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
	function PaymentTermsController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope,  ParseLinks, $ionicConfig)
	{
		///////////////
		// VARIABLES //
		///////////////
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
      }, {
        value: 7,
        label: 'Terminé'
      }];


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
        vm.quotation = $rootScope.quotation;

        vm.goBack = goBack;
        vm.chooseState = chooseState;
        vm.html = "";

        function goBack()
        {
            $state.go("indexquotation");
        }

        function chooseState()
        {
        	$state.go("choosestate");
        }
	}
})();
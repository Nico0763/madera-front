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
	CustomerManagerController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope','ParseLinks','$ionicConfig'];

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
	function CustomerManagerController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope,  ParseLinks, $ionicConfig)
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
        vm.quotation = $rootScope.quotation;
	}
})();

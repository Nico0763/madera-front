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
	IndexPageController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope'];

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
	function IndexPageController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope)
	{
		///////////////
		// VARIABLES //
		///////////////


		//////////////////////////
		// Controller variables //
		//////////////////////////

		/**
		 * The controller reference 
		 * @type {Object}
		 */
		var vm = this; 

		
			
	}
})();
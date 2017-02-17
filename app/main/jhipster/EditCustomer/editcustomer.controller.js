(function()
{
	'use strict';
	angular
		.module('main')
		.controller('EditCustomerController', EditCustomerController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	EditCustomerController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope', 'Customer','ParseLinks','$ionicConfig', '$ionicLoading'];

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
	function EditCustomerController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope, Customer, ParseLinks, $ionicConfig, $ionicLoading)
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
        vm.customer = JSON.parse(JSON.stringify($rootScope.customer));
        vm.saveCustomer = saveCustomer;
        vm.goBack = goBack;


				function goBack()
				{
					$state.go("customermanager");
				}


				function saveCustomer()
				{
						$ionicLoading.show({
							template: 'Loading...'
						})
						Customer.update(vm.customer,function (data)
						{
								$rootScope.customer = data;
								$ionicLoading.hide();
								$state.go('customermanager');
						}, function(error)
						{
							$ionicLoading.hide();
						});
				}


	}
})();

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
	EditProjectController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope','ParseLinks','$ionicConfig', 'Quotation', '$ionicLoading'];

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
	function EditProjectController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope,  ParseLinks, $ionicConfig, Quotation, $ionicLoading)
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
        vm.quotation = $rootScope.quotation;
        vm.saveQuotation = saveQuotation;

        function saveQuotation()
        {
            $ionicLoading.show({
              template: 'Loading...'
            })

            Quotation.update($rootScope.quotation,function (data)
            {
                $ionicLoading.hide();
                $state.go('indexquotation');
            });
        }

	}
})();
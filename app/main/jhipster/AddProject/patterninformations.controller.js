(function()
{
	'use strict';
	angular
		.module('main')
		.controller('PatternInformationsController', PatternInformationsController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	PatternInformationsController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope','ParseLinks','$ionicConfig', '$ionicLoading', '$uibModalInstance', 'entity', 'GetProductsByPattern', 'GetComponentsByProduct'];

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
	function PatternInformationsController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope,  ParseLinks, $ionicConfig, $ionicLoading, $uibModalInstance, entity, GetProductsByPattern, GetComponentsByProduct)
	{
		///////////////
		// VARIABLES //
		///////////////

    var vm = this;
    vm.predicate = 'id';
    vm.reverse = 'asc';
    vm.pattern = entity;
    vm.products = GetProductsByPattern.query({id:vm.pattern.id});
    vm.goBack = goBack;
    vm.selectProduct = selectProduct;
    vm.crtProduct = null;
    vm.components = null;
    var modalInstance = $uibModalInstance;
    $ionicLoading.hide();


    
    function goBack()
        {
              $state.go('add_choosepattern');
             modalInstance.close();
        }

        function selectProduct(product){
            vm.crtProduct = product;
            $ionicLoading.show({template:'Loading...'});
            GetComponentsByProduct.query({id:product.id}, function(data)
            {
                vm.components = data;
                console.debug(vm.components);
                $ionicLoading.hide();
            })
        }


	}
})();
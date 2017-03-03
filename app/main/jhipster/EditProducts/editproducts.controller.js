(function()
{
	'use strict';
	angular
		.module('main')
		.controller('EditProductsController', EditProductsController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	EditProductsController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope','ParseLinks','$ionicConfig', 'Quotation', '$ionicLoading', 'GetProductsByQuotation', 'Product', 'ProductDependencies'];

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
	function EditProductsController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope,  ParseLinks, $ionicConfig, Quotation, $ionicLoading, GetProductsByQuotation, Product, ProductDependencies)
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
	    //Variables
	    vm.quotation = $rootScope.quotation;
	    vm.products = GetProductsByQuotation.query({id:vm.quotation.id});
	    vm.newProduct={module:null,name:"", quotation:vm.quotation}

        vm.goBack = goBack;
        vm.addProduct = addProduct;
        vm.removeProduct = removeProduct;
         vm.editData = {name:null};
        vm.select = null;
        vm.save = save;

        function goBack()
        {
        	$state.go("indexquotation");
        }



        function addProduct()
        {
        	 $ionicLoading.show({
              template: 'Loading...'
            });
        	ProductDependencies.save(vm.newProduct,function(data)
        	{
        		vm.products.push(data);
        		vm.newProduct.module = null;
        		vm.newProduct.name = "";
        		 $ionicLoading.hide()
        	});
        }

        function removeProduct(p)
        {	
        	 $ionicLoading.show({
              template: 'Loading...'
            });
        	ProductDependencies.delete({id:p.id},function(data)
        	{
        		vm.products.splice(vm.products.indexOf(p,1));
        		 $ionicLoading.hide()
        	});
        }

        $rootScope.$on('chooseModule', function(event, module) {vm.newProduct.module = module; });

        vm.selectElement = function(element, data)
        {
            vm.select = element;
            data.name = element.name;
        }

        function save(data)
        {

                vm.select.name = data.name;
            
                console.debug(vm.select);
                Product.update(vm.select, function(success){
                        console.debug(success);
                    }, function(error) {
                        console.debug(error);
                    });
                vm.select = null;
                

            data.name = null;


        }


//    $rootScope.$on('chooseAssortment', function(event, assortment) {vm.quotation.assortment = assortment; });

	}
})();
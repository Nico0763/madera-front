(function() {
    'use strict';

    angular
        .module('main')
        .controller('ConfigProductDialogController', ConfigProductDialogController);

    ConfigProductDialogController.$inject = ['$timeout', '$scope', '$stateParams', 'DataUtils', '$ionicConfig', '$state','ParseLinks', 'Quotation', '$ionicLoading', '$rootScope', '$uibModalInstance', 'Component_product', 'GetComponentsByProduct','entity'];

    function ConfigProductDialogController ($timeout, $scope, $stateParams, DataUtils,  $ionicConfig, $state,ParseLinks, Quotation, $ionicLoading, $rootScope, $uibModalInstance,  Component_product, GetComponentsByProduct, entity) {
        var vm = this;
         //A appeler dans les autre state pour réactiver la transition
        $ionicConfig.views.transition('none');

        //////////////////////////
        // Controller variables //
        //////////////////////////

         $scope.angles = [{
            value: 0,
            label: "Pas d'angle"
          }, {
            value: 1,
            label: 'Angle entrant'
          }, {
            value: 2,
            label: 'Angle sortant'
          }];



        /**
         * The controller reference 
         * @type {Object}
         */
         vm.save = save;
        vm.product = entity;
        vm.quotation = $rootScope.quotation;

        //Méthodes
        

        vm.goBack = goBack;
         vm.editData = {angle:null, length:null};
        vm.select = null;

        var modalInstance = $uibModalInstance;


        refreshProducts();
        function refreshProducts()
        {
            vm.components = GetComponentsByProduct.query({id:entity.id});
        }

        function goBack()
        {
             $state.go('editproducts');
             modalInstance.close();
        }
        /*** Edition ***/

        vm.selectElement = function(element, data)
        {
            vm.select = element;
            data.angle = element.angle;
            data.length = element.length;
        }

        function save(data)
        {

                vm.select.angle = data.angle;
                vm.select.length = data.length;
            
                console.debug(vm.select);
                Component_product.update(vm.select, function(success){
                        console.debug(success);
                    }, function(error) {
                        console.debug(error);
                    });
                vm.select = null;
                

            data.angle = null;
            data.length = null;


        }



      
    }
})();

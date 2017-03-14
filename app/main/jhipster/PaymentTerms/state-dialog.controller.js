(function() {
    'use strict';

    angular
        .module('main')
        .controller('StateDialogController', StateDialogController);

    StateDialogController.$inject = ['$timeout', '$scope', '$stateParams', 'DataUtils', 'GetCustomers', '$ionicConfig', '$state','ParseLinks', 'Quotation', '$ionicLoading', '$rootScope', '$uibModalInstance', '$ionicPopup'];

    function StateDialogController ($timeout, $scope, $stateParams, DataUtils, GetCustomers,  $ionicConfig, $state,ParseLinks, Quotation, $ionicLoading, $rootScope, $uibModalInstance, $ionicPopup) {
        var vm = this;
         //A appeler dans les autre state pour réactiver la transition
        $ionicConfig.views.transition('none');

        //////////////////////////
        // Controller variables //
        //////////////////////////

        /**
         * The controller reference 
         * @type {Object}
         */
        vm.goBack = goBack;
        vm.selectState = selectState;

        vm.quotation = $rootScope.quotation;

        $scope.state = vm.quotation.state;

        var modalInstance = $uibModalInstance;
        /*$ionicPopup.alert({
                 title: 'Impossible de changer l\'état',
                 template: 'Votre devis n\'est lié à aucun client'
               });*/
        
    

      
        function selectState(state)
        {
            $ionicLoading.show({
              template: 'Loading...'
            })
            //Actions à effectuer selon les choix
            if(state == 5)
                pushOrders();
            else
            {
                vm.quotation.state = state;
                updateQuotation();
            }



            
           
            
           
        }

        function updateQuotation()
        {
             Quotation.update(vm.quotation,function (data)
            {
                $rootScope.quotation = data;
                $ionicLoading.hide();
                goBack();
            }, function(error)
            {
                $ionicLoading.hide();
            });  
        }

        function goBack()
        {
             $state.go('paymentterms');
             modalInstance.close();
        }

        function pushOrders()
        {//Lance les commandes aux fournisseurs
            if(vm.quotation.customer == null)
            {
                 $ionicLoading.hide();
                $ionicPopup.alert({
                 title: 'Impossible de changer l\'état',
                 template: 'Votre devis n\'est lié à aucun client'
               });
            }
            else
            {
                //Appeler service de push orders;
                
            }

        }


      
    }
})();

(function() {
    'use strict';

    angular
        .module('main')
        .controller('StateDialogController', StateDialogController);

    StateDialogController.$inject = ['$timeout', '$scope', '$stateParams', 'DataUtils', 'GetCustomers', '$ionicConfig', '$state','ParseLinks', 'Quotation', '$ionicLoading', '$rootScope', '$uibModalInstance', '$ionicPopup', 'Commands_push', 'SumDeadlines'];

    function StateDialogController ($timeout, $scope, $stateParams, DataUtils, GetCustomers,  $ionicConfig, $state,ParseLinks, Quotation, $ionicLoading, $rootScope, $uibModalInstance, $ionicPopup, Commands_push, SumDeadlines) {
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
        
    

      
        function selectState(state)
        {
            
            //Actions à effectuer selon les choix
            if(state ==2)
            {
                $ionicLoading.show({
                  template: 'Loading...'
                })
                SumDeadlines.get({id:vm.quotation.id}, function(data)
                {
                    if(data.value >= 100)
                    {
                         $ionicLoading.show({
                          template: 'Loading...'
                        })
                        vm.quotation.state = state;
                        updateQuotation();
                    }
                    else
                    {
                        $ionicLoading.hide();
                        alert("Les deadlines ne sont pas égales à 100 %");
                    
                    }
                }
                ,function()
                {
                    $ionicLoading.hide();
                })
            }
            else if(state == 5)
                pushOrders();
            else
            {
                $ionicLoading.show({
                  template: 'Loading...'
                })
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
                alert('Votre devis n\'est lié à aucun client');
            }
            else
            {
                $ionicLoading.show({
                  template: 'Loading...'
                })
                //Appeler service de push orders;
                Commands_push.update({id:vm.quotation.id}, function()
                {
                    vm.quotation.state = 5;
                    updateQuotation();
                },
                function()
                {
                    $ionicLoading.hide();
                }); 

            }

        }


      
    }
})();

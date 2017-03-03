(function() {
    'use strict';

    angular
        .module('main')
        .controller('ModulesDialogController', ModulesDialogController);

    ModulesDialogController.$inject = ['$timeout', '$scope', '$stateParams', 'DataUtils', '$ionicConfig', '$state','ParseLinks', 'Quotation', '$ionicLoading', '$rootScope', '$uibModalInstance', 'Module_nature', 'Module','GetComponentsByModule'];

    function ModulesDialogController ($timeout, $scope, $stateParams, DataUtils,  $ionicConfig, $state,ParseLinks, Quotation, $ionicLoading, $rootScope, $uibModalInstance, Module_nature, Module, GetComponentsByModule) {
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
        //Variables
        vm.natures = Module_nature.query();
        vm.modules = Module.query();
        vm.components = null;
        vm.searchBox = "";
        vm.selectModule = selectModule;
        console.debug(vm.modules);

        //Méthodes
        

        vm.goBack = goBack;
        vm.validModule = validModule;


        var modalInstance = $uibModalInstance;


        function selectModule(newModule)
        {
            vm.currentModule = newModule;
            vm.components = GetComponentsByModule.query({id:newModule.id});
        }


    

        function goBack()
        {
             $state.go('editproducts');
             modalInstance.close();
        }

        function validModule()
        {
            if(vm.currentModule != null)
             $rootScope.$emit('chooseModule', vm.currentModule);
            $state.go('editproducts');
            modalInstance.close();

        }


      
    }
})();

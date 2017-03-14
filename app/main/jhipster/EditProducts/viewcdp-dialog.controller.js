(function() {
    'use strict';

    angular
        .module('main')
        .controller('ViewCdpDialogController', ViewCdpDialogController);

    ViewCdpDialogController.$inject = ['$timeout', '$scope', '$stateParams', 'DataUtils', '$ionicConfig', '$state','ParseLinks', 'Quotation', '$ionicLoading', '$rootScope', '$uibModalInstance','entity'];

    function ViewCdpDialogController ($timeout, $scope, $stateParams, DataUtils,  $ionicConfig, $state,ParseLinks, Quotation, $ionicLoading, $rootScope, $uibModalInstance, entity) {
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
        vm.principal_cross_section = entity;

        //Méthodes
        

        vm.goBack = goBack;
        var modalInstance = $uibModalInstance;


        

        function goBack()
        {
             $state.go('editproducts');
             modalInstance.close();
        }
    
    }
})();

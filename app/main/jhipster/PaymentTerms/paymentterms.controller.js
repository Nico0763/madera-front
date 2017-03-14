(function()
{
	'use strict';
	angular
		.module('main')
		.controller('PaymentTermsController', PaymentTermsController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	PaymentTermsController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope','ParseLinks','$ionicConfig', '$ionicLoading', 'Quotation', '$ionicPopup', 'Deadline', 'GetDeadlinesByQuotation', 'TotalQuotation','ionicDatePicker'];
 
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
	function PaymentTermsController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope,  ParseLinks, $ionicConfig, $ionicLoading, Quotation, $ionicPopup, Deadline, GetDeadlinesByQuotation, TotalQuotation,ionicDatePicker)
	{
		///////////////
		// VARIABLES //
		///////////////
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
	      }, {
	        value: 7,
	        label: 'Terminé'
	    }];



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
		vm.datePickerOpenStatus = {};
        vm.quotation = $rootScope.quotation;
        vm.total = 0;
        vm.crtPercent = 0;
        TotalQuotation.get({id:vm.quotation.id},function(data)
        	{
        		vm.total = data.value;
        	});

        vm.deadlines = GetDeadlinesByQuotation.query({id:vm.quotation.id},function()
        	{
        		calculPercent();
        	});
       
        vm.goBack = goBack;
        vm.save = save;
        vm.saveDeadline = saveDeadline;
        vm.addDeadline = addDeadline;
        vm.removeDeadline = removeDeadline;
        vm.chooseState = chooseState;
        vm.html = "";

         vm.editData = {date:null,name:null,percentage:null};
         vm.addData = {date:new Date(),name:null,percentage:0, quotation:vm.quotation};
         vm.select = null;
         

         vm.selectElement = function(element, data)
        {
            vm.select = element;
            data.date = element.date;
            data.name = element.name;
            data.percentage = element.percentage;
        }

        function goBack()
        {
            $state.go("indexquotation");
        }

        function chooseState()
        {
        	$state.go("choosestate");
        }

        function save()
        {

        	 $ionicLoading.show({
              template: 'Loading...'
            })
        	Quotation.update(vm.quotation, function(data)
        	{
        		$rootScope.quotation = data;

                $ionicLoading.hide();
                $ionicPopup.alert({
                	title:'Enregistrement effectué',
     				template: 'Le pourcentage commercial a été mis à jour'
                });
        	},
        	function()
        	{
        		$ionicLoading.hide();
        	});
        }

        function saveDeadline(data)
        {
        	vm.select.date = data.date;
        	vm.select.name = data.name;
        	vm.select.percentage = data.percentage;
            
                Deadline.update(vm.select, function(data){
                	calculPercent();
                        console.debug(data);
                    }, function(error) {
                        console.debug(error);
                    });
                vm.select = null;
                

            data.date = null;
            data.name = null;
            data.percentage = null;
        }

        function addDeadline()
        {
        	 $ionicLoading.show({
              template: 'Loading...'
            });
        	Deadline.save(vm.addData,function(data)
        	{
        		vm.deadlines.push(data);
        		vm.addData.date = new Date();
        		vm.addData.name = null;
        		vm.addData.percentage = 0;
        		$ionicLoading.hide()
        		calculPercent();
        	},
        	function()
        	{
        		$ionicLoading.hide();
        	});
        }

        function calculPercent()
        {
        	vm.crtPercent = 0;
        	for(var i=0;i<vm.deadlines.length;i++)
        	{
        		vm.crtPercent += vm.deadlines[i].percentage;
        	}
        	vm.addData.percentage = 0;
        }

         function removeDeadline(d)
        {	
        	 $ionicLoading.show({
              template: 'Loading...'
            });
        	Deadline.delete({id:d.id},function(data)
        	{
        		var index = vm.deadlines.indexOf(d);
        		vm.deadlines.splice(index,1);
        		$ionicLoading.hide()
        		calculPercent();
        	});
        }

        $scope.openDatePicker = function(elem){

	    	 var ipObj1 = {
	      callback: function (val) {  //Mandatory
	      		var date = new Date(val);
	       	 	elem.date = date;//date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
		      },
		      from: new Date(2012, 1, 1), //Optional
		      to: new Date(2020, 12, 31), //Optional
		      inputDate: new Date(elem.date),      //Optional
		      mondayFirst: true,          //Optional
		      disableWeekdays: [0],       //Optional
		      closeOnSelect: false,       //Optional
		      templateType: 'popup'       //Optional
		    };

	      ionicDatePicker.openDatePicker(ipObj1);
	    };
	}
})();
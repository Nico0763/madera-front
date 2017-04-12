(function()
{
	'use strict';
	angular
		.module('main')
		.controller('PrintProjectController', PrintProjectController);

	/**
	 * Function who inject module for Angular
	 * @type {Array}
	 */
	PrintProjectController.$inject = ['$scope', '$filter', 'Principal', '$state', '$location', '$ionicNavBarDelegate', 'Config', '$ionicSideMenuDelegate', '$rootScope','ParseLinks','$ionicConfig','GetProductsByQuotation','GetComponentsByProduct'];
 
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
	function PrintProjectController($scope, $filter, Principal, $state, $location, $ionicNavBarDelegate, Config, $ionicSideMenuDelegate, $rootScope,  ParseLinks, $ionicConfig, GetProductsByQuotation,GetComponentsByProduct)
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
        vm.quotation = $rootScope.quotation;
       	vm.products = GetProductsByQuotation.query({id:vm.quotation.id});

        vm.goBack = goBack;
        vm.html = "";

   

        function goBack()
        {
            $state.go("indexquotation");
        }


        vm.printTechnical = printTechnical;
        function printTechnical()
        {

        	vm.html = "<html>";

        	//Informations clientes
        		vm.html+= "<b>Produits :</b><br/><br/>";
        		vm.crtPro = 0;
        		addProduct();
        }

        function addProduct()
        {
        	if(vm.crtPro<vm.products.length)
        	{
        			var product = vm.products[vm.crtPro];
        			vm.crtPro ++;
        		vm.html += "Nom : " + product.name + "<br/>";
	    					vm.html += "<b>" + product.module.name + "</b><br/>";
	    					

	    					vm.html+= "<table><thead><tr><th>Référence</th><th>Longueur</th></tr></thead><tbody>";
	        				
	    					var cps = GetComponentsByProduct.query({id:product.id}, function (cps)
	    						{
	    								cps.forEach(function(cp) {
					    					vm.html += "<tr>";
					    					vm.html += "<th>" + cp.component.reference + "</th>";
					    					vm.html += "<th>" + cp.length + "</th>";
											vm.html += "</tr>";
											});
			        					vm.html += "</tbody></table>"
			    						vm.html += "<br/><br/>";
			    						addProduct();

	    						});
	    				}
	    				else
	    					{ //fin

	    							vm.html += "</html>"




	        	cordova.plugins.printer.print(vm.html, { duplex: 'long' }, function (res) {
	               	
		    					});
	        }
        }




        vm.printQuotation = printQuotation;
        function printQuotation()
        {
        	var html = "<html>";

        	//Informations clientes
        		html+= "<b>Client :</b><br/>";
        		html+= vm.quotation.customer.firstname +"<br/>";
        		html+= vm.quotation.customer.name +"<br/>";
        		html+= vm.quotation.customer.phone_number +"<br/>";
        		html+= vm.quotation.customer.mail +"<br/>";
        		html+= vm.quotation.customer.address +" " + vm.quotation.customer.cp + ",<br/>";
        		html+= vm.quotation.customer.city + "<br/><br/>";

        	//Projet
        		html+= "<b>Projet :</b><br/>";
        		html+= "Référence : " + vm.quotation.reference + "<br/>";
        		html+= "Nom : " + vm.quotation.name + "<br/>";
        		html+= "Date : " + vm.quotation.date + "<br/><br/>";

        	//Produits
        		html+= "<b>Produits :</b><br/>";
        		html+= "<table><thead><tr><th>Nom</th><th>Module</th><th>Prix</th></tr></thead><tbody>";
        		var total = 0;
        		vm.products.forEach(function(product) {
	    				html += "<tr>";
	    					html += "<th>" + product.name + "</th>";
	    					html += "<th>" + product.module.name + "</th>";
	    					html += "<th>" + product.module.price + "</th>";



	    				html += "</tr>";
						total += product.module.price;
					});
        		html += "</tbody></table><br/><br/>"


        		html+= "Prix total : " + total + " €<br/><br/>";


        	html += "</html>"


        	cordova.plugins.printer.print(html, { duplex: 'long' }, function (res) {
                
            });
        }

       

      

	}
})();
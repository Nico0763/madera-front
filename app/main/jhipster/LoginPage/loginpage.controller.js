(function()
{
	'use strict';
	angular
		.module('main')
		.controller('LoginPageController', LoginPageController);

	/**
	 * Function who inject module for Angular 
	 * @type {Array}
	 */
	LoginPageController.$inject = ['$rootScope', '$ionicSideMenuDelegate', '$scope', 'Principal', '$state', '$timeout', 'Auth', '$cordovaNetwork', '$ionicPlatform', '$ionicPopup', '$ionicLoading', '$cordovaDeviceOrientation', 'Config', '$localStorage'];

	/**
	 * The Login Page controller
	 * @param {[type]} $rootScope                RootScope module
	 * @param {[type]} $ionicSideMenuDelegate    IonicSideMenuDelegate module
	 * @param {[type]} $scope                    Scope module
	 * @param {[type]} Principal                 Principal module
	 * @param {[type]} $state                    State module
	 * @param {[type]} $timeout                  Timeout module
	 * @param {[type]} Auth                      Auth module
	 * @param {[type]} $cordovaNetwork           CordovaNetwork module 
	 * @param {[type]} $ionicPlatform            IonicPlatform module
	 * @param {[type]} $ionicPopup               IonicPopup module
	 * @param {[type]} $ionicLoading             IonicLoading module
	 * @param {[type]} $cordovaDeviceOrientation CordovaDeviceOrientation module
	 */
	function LoginPageController($rootScope, $ionicSideMenuDelegate, $scope, Principal, $state, $timeout, Auth, $cordovaNetwork, $ionicPlatform, $ionicPopup, $ionicLoading, $cordovaDeviceOrientation, Config, $localStorage)
	{
		/////////////////
		// VARIABLES   //
		/////////////////

		
		///////////////////////////
		// Controller variables  //
		///////////////////////////
		
		/**
		 * The controller reference 
		 * @type {Object}
		 */
		var vm = this; 

		/**
		 * The variable for authentification error 
		 * @type {Boolean}
		 */
		vm.authenticationError = false;

		/**
		 * The credentials required for authentification 
		 * @type {Object}
		 */
        vm.credentials = {};

        /////////////////////////
        // Internal variables  //
        /////////////////////////
        
     	/**
     	 * The boolean to show or hide the connect popup 
     	 * @type {Boolean}
     	 */
        var popupConnect = false; 

        /////////////////////////
        // External variables  //
        /////////////////////////
         
        /**
         * The admin object for the form fields 
         * @type {Object}
         */
		$scope.admin = {password: null, login: null};

		/**
		 * The variable to detect an error
		 * @type {Boolean}
		 */
		$scope.isErrorVisible = false;

		/**
		 * The variable to detect a network error 
		 * @type {Boolean}
		 */
		$scope.isNetworkVisible = false; 




		/************ CONTROLLER MAIN EXECUTION *******************/


		 //Désactivation du bouton de retour
            $ionicPlatform.registerBackButtonAction(function (event) {
                    event.preventDefault();
            }, 100);


		$ionicSideMenuDelegate.canDragContent(false);
		$rootScope.$on('error-login', function() {
		            "error";
		        });
	/*	$ionicPlatform.ready(function()
		{
			if($cordovaNetwork.isOffline())
			{
				$scope.isNetworkVisible = true; 

				var alertPopup = $ionicPopup.alert({
					title: "Problème de connexion",
					template: "Vous n'êtes pas connecté, l'application est indisponible."
   				});
			}	

			$rootScope.$on('$cordovaNetwork:offline', function()
			{
				if(!popupConnect)
				{
					var alertPopup = $ionicPopup.alert({
					title: "Problème de connexion",
					template: "Vous n'êtes pas connecté, l'application est indisponible. Veuillez attendre d'obtenir une connexion."
   					});
   					popupConnect = true; 
					$scope.isNetworkVisible = true; 
				}
			});

			$rootScope.$on('$cordovaNetwork:online', function()
			{
				if(popupConnect)
				{
					var alertPopup = $ionicPopup.alert({
					title: "Connexion retrouvé",
					template: "Vous êtes connecté, l'application est disponible."
   					});
   					popupConnect = false; 
					$scope.isNetworkVisible = false; 
				}
			});
		});*/

		/************ CONTROLLER EXTERNAL FUNCTIONS *******************/
		
		/**
		 * Connect to the server and send data for authentification 
		 * @return {void} null
		 */
		vm.connect = function()
		{
			$ionicLoading.show({
				template: 'Chargement en cours'
			}).then(function()
			{
				console.log($scope.admin.login + " - " + $scope.admin.password);

				/*** Supprime le précédent login ***/

				
				Auth.login({
	                username: $scope.admin.login,
	                password: $scope.admin.password,
	                rememberMe: true
	            }).then(function (success) {
	            	console.log(success);
	                vm.authenticationError = false;
	                if ($state.current.name === 'register' || $state.current.name === 'activate' ||
	                    $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
	                    $state.go('loginpage');
	                }
	                $rootScope.$broadcast('authenticationSuccess');

	                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
	                // since login is succesful, go to stored previousState and clear previousState
	                if (Auth.getPreviousState()) {

	                    var previousState = Auth.getPreviousState();
	                    Auth.resetPreviousState();
	                    $state.go(previousState.name, previousState.params);
	                }
	                	$state.go('indexpage');
	                	$ionicLoading.hide();
	            }).catch(function (error) {
	            	console.log(error);
					$scope.isErrorVisible = true;
	            	$state.go('loginpage');
	                $ionicLoading.hide();
	            });
			}); 
		}
	}
})();
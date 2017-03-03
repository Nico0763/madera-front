(function()
{
	'use strict';
	angular
		.module('main')
		.config(stateConfig);

	stateConfig.$inject = ['$stateProvider'];

	/**
	 * Configure the index page state 
	 * @param  {[type]} $stateProvider [description]
	 * @return {[type]}                [description]
	 */
	function stateConfig($stateProvider)
	{
		$stateProvider.state('editproducts',
			{
				parent: 'app',
				url: '/editproducts',
				cache:false,
				data:
				{
					authorities: ['ROLE_USER'],
					pageTitle: 'global.menu.gmaptour'
				},
				views:
				{
					'pageContent':
					{
						templateUrl: 'main/jhipster/EditProducts/editproducts.html',
						controller: 'EditProductsController',
						controllerAs: 'vm'
					}
				},
            	resolve: {
                	translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('indexpage');
                    return $translate.refresh();
                }]
            }
			})
         .state('choosemodule', {
                parent: 'editproducts',
                url: '/choosemodule',
                data: {
                    authorities: ['ROLE_USER']
                },
               
                cache:false,
                params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'main/jhipster/EditProducts/modules-dialog.html',
                        controller: 'ModulesDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                        }
                    }).result.then(function() {
                      //  $state.go('editproject');
                    }, function() {
                      //  $state.go('editproject');
                    });
                }]
            }).state('configproduct', {
                parent: 'editproducts',
                url: '/{id_product}/configproduct',
                data: {
                    authorities: ['ROLE_USER']
                },
               
                cache:false,
                params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'main/jhipster/EditProducts/configproduct-dialog.html',
                        controller: 'ConfigProductDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }],
                            entity: ['Product', function(Product) {
                                return Product.get({id : $stateParams.id_product}).$promise;
                            }]
                        }
                    }).result.then(function() {
                      //  $state.go('editproject');
                    }, function() {
                      //  $state.go('editproject');
                    });
                }]
            });
	}
})();
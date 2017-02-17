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
		$stateProvider.state('editproject',
			{
				parent: 'app',
				url: '/editproject',
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
						templateUrl: 'main/jhipster/EditProject/editproject.html',
						controller: 'EditProjectController',
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

		 .state('choosecustomer', {
                parent: 'editproject',
                url: '/choosecustomer',
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
                        templateUrl: 'main/jhipster/EditProject/customer-dialog.html',
                        controller: 'CustomerDialogController',
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
            })
		 .state('chooseassortment', {
                parent: 'editproject',
                url: '/chooseassortment',
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
                        templateUrl: 'main/jhipster/AssortmentSelecter/assortmentselecter.html',
                        controller: 'AssortmentSelecterController',
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
                        //$state.go('editproject');
                    }, function() {
                       // $state.go('editproject');
                    });
                }]
            });
	}
})();
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
		$stateProvider.state('addproject',
			{
				parent: 'app',
				url: '/addproject',
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
						templateUrl: 'main/jhipster/AddProject/addproject.html',
						controller: 'AddProjectController',
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
        .state('add_choosecustomer',
            {
                parent: 'app',
                url: '/addproject/choosecustomer',
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
                data:
                {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.gmaptour'
                },
                views:
                {
                    'pageContent':
                    {
                        templateUrl: 'main/jhipster/AddProject/choosecustomer.html',
                        controller: 'ChooseCustomerController',
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
        .state('add_chooseassortment',
            {
                parent: 'app',
                url: '/addproject/chooseassortment',
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
                data:
                {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.gmaptour'
                },
                views:
                {
                    'pageContent':
                    {
                        templateUrl: 'main/jhipster/AddProject/chooseassortment.html',
                        controller: 'ChooseAssortmentController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('indexpage');
                    return $translate.refresh();
                }]
            }
            });
	}
})();
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
            parent: 'app',
            url: '/editproject/customer',
            cache:false,
				data:
				{
					authorities: ['ROLE_USER'],
					pageTitle: 'global.menu.gmaptour'
				},
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
				views:
				{
					'pageContent':
					{
						templateUrl: 'main/jhipster/EditProject/customer-dialog.html',
						controller: 'CustomerDialogController',
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
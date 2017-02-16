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
		$stateProvider.state('cutomermanager',
			{
				parent: 'app',
				url: '/cutomermanager',

				data:
				{
					authorities: ['ROLE_USER'],
					pageTitle: 'global.menu.gmaptour'
				},
				views:
				{
					'pageContent':
					{
						templateUrl: 'main/jhipster/CustomerManager/cutomermanager.html',
						controller: 'CustomerManagerController',
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

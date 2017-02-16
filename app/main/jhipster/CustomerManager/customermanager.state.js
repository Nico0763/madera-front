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
		$stateProvider.state('customermanager',
			{
				parent: 'app',
				url: '/customermanager',

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
						templateUrl: 'main/jhipster/CustomerManager/customermanager.html',
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

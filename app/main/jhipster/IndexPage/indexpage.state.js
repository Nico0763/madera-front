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
		$stateProvider.state('indexpage',
		{
			parent: 'app',
			url: '/indexpage',
			 nativeTransitions: {
		        "type": "flip",
		        "direction": "up"
		    },
			data:
			{
				authorities: ['ROLE_USER'],
				pageTitle: 'global.menu.indexpage'
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
					templateUrl: 'main/jhipster/IndexPage/indexpage.html',
					controller: 'IndexPageController',
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
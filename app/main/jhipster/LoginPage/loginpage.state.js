(function()
{
	'use strict';
	angular
		.module('main')
		.config(stateConfig);

	stateConfig.$inject = ['$stateProvider'];

	/**
	 * Configure the login page state 
	 * @param  {[type]} $stateProvider [description]
	 * @return {[type]}                [description]
	 */
	function stateConfig($stateProvider)
	{
		$stateProvider.state('loginpage',
		{
			parent: 'app',
			url: '/loginpage',
			data:
			{
				authorities: [],
				pageTitle: 'global.menu.loginpage'
			},
			views: 
			{
				'pageContent': 
				{
					templateUrl: 'main/jhipster/LoginPage/loginpage.html',
					controller: 'LoginPageController',
					controllerAs: 'vm'
				}
			},
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('loginpage');
                    return $translate.refresh();
                }]
            }
		});
	}
})();
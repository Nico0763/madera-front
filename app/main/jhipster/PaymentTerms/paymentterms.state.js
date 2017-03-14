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
		$stateProvider.state('paymentterms',
			{
				parent: 'app',
				url: '/paymentterms',
				cache:false,
				data:
				{
					authorities: ['ROLE_USER']
				},
				views:
				{
					'pageContent':
					{
						templateUrl: 'main/jhipster/PaymentTerms/paymentterms.html',
						controller: 'PaymentTermsController',
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
			.state('choosestate', {
                parent: 'paymentterms',
                url: '/editstate',
                data: {
                    authorities: ['ROLE_USER']
                },
               
                cache:false,
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'main/jhipster/PaymentTerms/state-dialog.html',
                        controller: 'StateDialogController',
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
            });
	}
})();
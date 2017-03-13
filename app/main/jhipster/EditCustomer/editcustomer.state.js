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
		$stateProvider.state('editcustomer',
			{
				parent: 'app',
				url: '/{id}/editcustomer',
				cache: false,
				data:
				{
					authorities: ['ROLE_USER'],
					pageTitle: 'global.menu.gmaptour'
				},
				views:
				{
					'pageContent':
					{
						templateUrl: 'main/jhipster/EditCustomer/editcustomer.html',
						controller: 'EditCustomerController',
						controllerAs: 'vm'
					}
				},
            	resolve: {
		                entity: ['Customer','$stateParams', function(Customer, $stateParams) {
		                            var cust = Customer.get({id : $stateParams.id}).$promise;
		                            console.debug(cust);
		                            return cust;
		                        }]
            	}
			})
		.state('addcustomer', {
            parent: 'app',
            url: '/addcustomer',
            cache: false,
				data:
				{
					authorities: ['ROLE_USER'],
					pageTitle: 'global.menu.gmaptour'
				},
				views:
				{
					'pageContent':
					{
						templateUrl: 'main/jhipster/EditCustomer/editcustomer.html',
						controller: 'EditCustomerController',
						controllerAs: 'vm'
					}
				},
            	resolve: {
		               entity: function () {
		                            return {
		                                name: null,
		                                firstname: null,
		                                address: null,
		                                pc: null,
		                                city: null,
		                                phone_number: null,
		                                mail: null,
		                                id: null
		                            };
		                        }
		         }
	})
	}
})();

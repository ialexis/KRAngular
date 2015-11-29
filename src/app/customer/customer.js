(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                    .state('root.customer', {
                        url: '/customer',
                        parent: 'root',
                        views: {
                            "container@": {
                                controller: 'CustomerController',
                                templateUrl: 'customer/customer.tpl.html'
                            }
                        },
                        data: {
                            pageTitle: 'Customer'
                        }
                    });
        }]);

    app.controller('CustomerController', ['$scope', '$log', '$state', function ($scope, $log, $state) {
            $log.info('App:: Starting CustomerController');
            var init = function () {
                $scope.model = {};
                $scope.model.pageTitle = $state.current.data.pageTitle;

            };

            init();

        }]);

}(angular.module("KRAngular.customer", [
    'ui.router',
    'globalService',
    'customerService'
])));
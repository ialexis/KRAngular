(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                    .state('root.product', {
                        url: '/product',
                        parent: 'root',
                        views: {
                            "container@": {
                                controller: 'CustomerController',
                                templateUrl: 'product/product.tpl.html'
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

}(angular.module("KRAngular.product", [
    'ui.router',
    'globalService',
    'productService'
])));
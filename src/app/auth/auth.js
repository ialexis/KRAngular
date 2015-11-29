(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                    .state('root.auth', {
                        url: '/auth',
                        parent: 'root',
                        views: {
                            "container@": {
                                controller: 'AuthController',
                                templateUrl: 'auth/auth.tpl.html'
                            }
                        },
                        data: {
                            pageTitle: 'Auth'
                        }
                    })
                    .state('root.logout', {
                        url: '/auth/logout',
                        parent: 'root',
                        views: {
                            "container@": {
                                controller: 'LogoutController',
                                templateUrl: 'auth/logout.tpl.html'
                            }
                        },
                        data: {
                            pageTitle: 'Logout'
                        }
                    });
        }]);

    app.controller('AuthController', ['$scope', '$log', '$state', function ($scope, $log, $state) {
            $log.info('App:: Starting AuthController');
            var init = function () {
                $scope.model = {};
                $scope.model.pageTitle = $state.current.data.pageTitle;

            };

            init();

        }]);

    app.controller('LogoutController', ['$scope', '$log', '$state', '$stateParams',
        function ($scope, $log, $state, $stateParams) {
            var init = function () {
                $scope.model = {};
                $scope.model.pageTitle = $state.current.data.pageTitle;
            };

            init();
        }]);

}(angular.module("KRAngular.auth", [
    'ui.router',
    'globalService',
    'authService'
])));
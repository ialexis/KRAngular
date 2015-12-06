(function (app) {

    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');
            $httpProvider.interceptors.push('cInterceptor');

            //Root view, very important resolve data async before states
            $stateProvider
                    .state('root', {
                        url: '',
                        abstract: true,
                        resolve: {
                            load_data: (['globalService', '$q', '$log',
                                function (globalService, $q, $log) {
                                    $log.warn('App::ResolveData::');
                                    //Simpli example
                                    var def = $q.defer();
                                    globalService.api().get(function (data) {
                                        def.resolve(data);
                                        $log.warn(data);
                                    }, function (err) {
                                        def.reject(err);
                                    });
                                    return def.promise;
                                }])
                        },
                        views: {
                            'header': {
                                templateUrl: 'header.tpl.html',
                                controller: 'FrontController'
                            },
                            'footer': {
                                templateUrl: 'footer.tpl.html',
                                controller: 'FooterController'
                            }
                        }
                    });
            
            //Remove hashtag from URL
            $locationProvider.html5Mode(true);
        }
    ]);

    app.run(['$log', function ($log) {

            //Testing $log 
            /*
             $log.log('App::log:: Log');
             $log.warn('App::log:: warn');
             $log.info('App::log:: info');
             $log.error('App::log:: error');
             */
        }]);

    app.controller('AppController', ['$scope', '$log', function ($scope, $log) {
            $log.info('App:: Starting AppController');
        }]);

    app.controller('FrontController', ['$scope', '$log','$location', function ($scope, $log,$location) {
            $log.info('App:: Starting FrontController');

            
            $scope.isCollapsed = true;

        }]);

    app.controller('FooterController', ['$scope', '$log', function ($scope, $log) {
            $log.info('App:: Starting FooterController');
        }]);

}(angular.module("KRAngular", [
    'ngResource',
    'globalService',
    'genericDirectives',
    'KRAngular.home',
    'KRAngular.customer',
    'KRAngular.product',
    'KRAngular.about',
    'KRAngular.infinite',
    'KRAngular.auth',
    'ui.bootstrap',
    'templates-app',
    'templates-common',
    'templates-hf',
    'ui.router.state',
    'ui.router',
    'cInterceptor',
    'ng-mfb'
])));

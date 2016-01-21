(function (app) {

    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider','$resourceProvider','localStorageServiceProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider,$resourceProvider,localStorageServiceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
            $urlRouterProvider.otherwise('/');
            $httpProvider.interceptors.push('cInterceptor');

            //Config cookie system 1.0 2.0
            localStorageServiceProvider
                .setPrefix('')
                .setStorageType('localStorage')
                .setStorageCookie(1, '/')
                //.setStorageCookieDomain('walladog.com')
                //For testing pruposals use empty string instade of walladog domain
                .setStorageCookieDomain('')
                .setNotify(true, true);




            //Root view, very important resolve data async before states
            $stateProvider
                .state('root', {
                    url: '',
                    abstract: true,
                    resolve: {
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

    app.run(['$log','$state','$rootScope','configService', function ($log,$state,$rootScope,configService) {

        configService.setUpInitVars();
        configService.setUpMessages();

        if($state.current.name==='root.home' || $state.current.name===''){
            $rootScope.showCameraIcon = true;
        }

        /** watchers para cambio de vista **/
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                $rootScope.domReady=false;
                //$log.warn('Fired stateChangeStart');
            });

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error){
                $log.warn('Error changing state:');
                $log.warn(fromState);
                $log.warn(toState);
                $rootScope.domReady=true;
            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){
                //$log.warn('Fired success');
                if(toState.name==="root.home"){
                    $rootScope.showCameraIcon = true;
                }else{
                    $rootScope.showCameraIcon = false;
                }
                $rootScope.domReady=true;
            });


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
    'LocalStorageModule',
    'cInterceptor',
    'configService',
    'genericDirectives',
    'KRAngular.home',
    'KRAngular.customer',
    'KRAngular.product',
    'KRAngular.about',
    'KRAngular.apitest',
    'KRAngular.infinite',
    'KRAngular.auth',
    'KRAngular.userProfile',
    'ui.bootstrap',
    'templates-app',
    'templates-common',
    'templates-hf',
    'ui.router.state',
    'ui.router',
    'ngAnimate',
    'angularjs-dropdown-multiselect'
])));

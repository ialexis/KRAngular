(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                    .state('root.userProfile', {
                        url: '/userProfile',
                        parent: 'root',
                        views: {
                            "container@": {
                                controller: 'userProfileController',
                                templateUrl: 'userProfile/userProfile.tpl.html'
                            }
                        },
                        data: {
                            pageTitle: 'userProfile'
                        }
                    });
        }]);

    app.controller('userProfileController', ['$scope', '$log','$state','userProfileService','userProfileSearchsService','userProfileTransactionsService' ,function ($scope, $log,$state,userProfileService,userProfileSearchsService,userProfileTransactionsService) {
            $log.info('App:: Starting userProfileController');

        var init;
        $scope.dameProductosVenta=function ()
        {



            userProfileService.getAction().then(function(data){
               $log.info(data);
                $scope.model=data;
            });
        };

        $scope.dameProductosVendidos=function ()
        {
            userProfileTransactionsService.getAction().then(function(data){
                $log.info(data);
                $scope.model=data;
            });
        };



        init = function () {
            $scope.model = {};
            $scope.model.pageTitle = $state.current.data.pageTitle;

        };
            init();
        }]);

}(angular.module("KRAngular.userProfile", [
    'ui.router',
    'userProfileService',
    'userProfileTransactionsService',
    'userProfileSearchsService'
])));


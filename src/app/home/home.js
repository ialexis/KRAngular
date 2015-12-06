(function (app) {
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                    .state('root.home', {
                        url: '/',
                        parent: 'root',
                        views: {
                            "container@": {
                                controller: 'HomeController',
                                templateUrl: 'home/home.tpl.html'
                            }
                        },
                        data: {
                            pageTitle: 'Home'
                        }
                    });                               
        }]);

    app.controller('HomeController', ['$log','$scope','$state', function ($log,$scope,$state) {

            var init = function () {
                $log.info('App:: Starting HomeController');
                $scope.model={};
                $scope.model.pageTitle=$state.current.data.pageTitle;

                $scope.photos = [
                    {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/200/200/"},
                    {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/200/300/sports"},
                    {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/200/200/nightlife"},
                    {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/200/200/"},
                    {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/200/120/sports"},
                    {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/200/200/nightlife"},
                    {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/200/200/"},
                    {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/200/300/sports"},
                    {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/200/200/nightlife"},
                    {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/200/190/"},
                    {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/200/200/sports"},
                    {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/200/200/nightlife"},
                    {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/200/200/"},
                    {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/200/200/sports"},
                    {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/200/200/nightlife"},
                    {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/200/200/"},
                    {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/200/200/sports"},
                    {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/200/200/nightlife"}
                ];
            };

            init();

        }]);
}(angular.module("KRAngular.home", [
    'ui.router',
    'akoenig.deckgrid'
])));
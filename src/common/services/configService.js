/**
 * Created by hadock on 6/12/15.
 */

angular.module('configService', [])
    .factory('configService', ['$resource', '$q','$rootScope','$log',
        function ($resource, $q,$rootScope,$log) {
            return {
                api: function (extra_route) {
                    if (!extra_route) {
                        extra_route = '';
                    }
                    return $resource(API_URL + '/config' + extra_route, {}, {
                        query: {
                            timeout: 15000
                        },
                        save: {
                            timeout: 15000,
                            method: 'POST'
                        },
                        get: {
                            timeout: 15000,
                            method: 'GET'
                        }
                    });
                },
                getConfiguration: function () {
                    //Get app configuration
                    var def = $q.defer();
                    this.api().get({}, {}, function (data) {
                        def.resolve(data);
                    }, function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                },
                setUpInitVars: function(){
                    $rootScope.domReady = false;
                    $rootScope.showCameraIcon = false;
                    $rootScope.userData = {
                        isLogged:false,
                        idCustomer:0,
                        userName:'unknown',
                        csrftoken:''
                    };
                },
                setUpMessages: function(){
                    $rootScope.aMessages = {
                        loading : 'Cargando página, espera unos segundos...',
                        error : 'Ha ocurrido un error',
                        apiError : 'Error de conexion, comprueba tu conexión a internet.'
                    };
                }
            };
        }]);




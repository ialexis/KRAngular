/* 
 * AuthService Módule
 */
angular.module('authService', [])
        .factory('authService', ['$resource', '$q', '$log','globalService',
            function ($resource, $q, $log,globalService) {
                return {
                    api: function (extra_route,extra_data,api_endpoint,isOAUTH) {
                        if (!extra_route) {
                            extra_route = '';
                        }
                        var API_URL_VAR = API_URL;
                        if(isOAUTH){
                            API_URL_VAR = API_URL_OAUTH;
                        }

                        return $resource(API_URL_VAR + api_endpoint + extra_route, {}, {
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
                            },
                            put: {
                                timeout: 15000,
                                method: 'PUT'
                            },
                            postOauth2Login: {
                                timeout: 15000,
                                method: 'POST',
                                headers:{'Authorization':'Basic '+extra_data},
                                withCredentials: false
                            }
                        });
                    },
                    doLoginOAuth2: function(loginData){
                        var postDataToSend={
                            grant_type:'password',
                            username:loginData.username,
                            password:loginData.password,
                            scope:'read write'
                        };
                        var def = $q.defer();
                        var aHeader = globalService.base64Encode(CID+':'+CSE);
                        this.api(false,aHeader,'/o/token/',true).postOauth2Login(postDataToSend, {}, function (data) {
                            def.resolve(data);
                        }, function (err) {
                            def.reject(err);
                        });
                        return def.promise;
                    },
                    doLogout: function (postData) {
                        var def = $q.defer();
                        this.api().post({}, postData, function (data) {
                            def.resolve(data);
                        }, function (err) {
                            def.reject(err);
                        });
                        return def.promise;
                    }
                };
            }]);




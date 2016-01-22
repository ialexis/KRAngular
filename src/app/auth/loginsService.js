/* 
 * Get infor for customer
 */
angular.module('loginsService', [])
        .factory('loginsService', ['$resource', '$q', '$log',
            function ($resource, $q, $log) {
                return {
                    api: function (extra_route) {
                        console.log('logins');
                        if (!extra_route) {
                            extra_route = '';
                        }
                        return $resource(API_URL + '/logins/' + extra_route, {}, {
                            stripTrailingSlashes: false,
                            query: {
                                timeout: 15000,
                                method: 'GET',
                                isArray: true
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
                    getUserInfo: function () {
                        console.log('entramos');
                        //Service action with promise resolve (then)
                        var def = $q.defer();
                        this.api().get({}, {}, function (data) {
                            $log.warn('Api::data:: ');
                            $log.warn(data);

                            def.resolve(data);
                        }, function (err) {
                            def.reject(err,def.promise);
                        });
                        return def.promise;
                    }
                };
            }]);




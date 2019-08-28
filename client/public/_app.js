var app = angular.module('btender', ['ui.router']);

app.controller('MainCtrl', ['$scope', function ($scope) {

    $scope.title = 'Btender';

}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('main');
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '/public/_main.html',
            controller: 'MainCtrl'
        });
}]);
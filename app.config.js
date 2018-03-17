(function (angular) {
    'use script'

    var app = angular.module('app', [
        'ngFileSaver',
        'ngAria',
        'ngMessages',
        'ngAnimate',
        'ngMaterial',
        'chart.js',
        'chartBuilderApp',
        'chartBuilder',
        'chartsView',
        'barChart',
        'pieChart',
        'chartGrid',
        'chartList',
        'updateChart',
        'ui.router',
        'ui.bootstrap',
        'service.chart-builder'
    ])
    .run(function($rootScope){
      $rootScope.theme = 'dark';
    });

    app.config(['$urlRouterProvider', function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/'); // default route
    }]);

}(window.angular));

(function() {
  'use strict';

  var module = angular.module('chartBuilderApp', ['ui.router'])
    .config(function($stateProvider) {

      var states = [{
          name: 'chartBuilder',
          url: '/chartBuilder',
          template: '<chart-builder/>'
        },
        {
          name: 'chartView',
          url: '/charts',
          template: '<chart-view/>'
        },
        {
          name: 'updateChart',
          url: '/charts/updateChart/{chartId}',
          template: '<update-chart/>'
        },
        {
          name: 'chartBuilderApp',
          url: '/',
          templateUrl: 'src/views/chartBuilderApp/chartBuilderApp.html',
          controller: 'chartBuilderAppController',
          controllerAs: 'vm'
        }
      ];


      states.forEach(function(state) {
        $stateProvider.state(state);
      });


    });

})();

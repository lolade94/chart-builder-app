(function(){
  'use strict';

  angular.module('updateChart')
    .component('updateChart', {
      bindings: {
        UpdateChart: '<'
      },
      controller: 'UpdateChartController',
      controllerAs:'vm',
      templateUrl:'src/components/chartsCatalogList/updateChart/updateChart.html'
    });
})();

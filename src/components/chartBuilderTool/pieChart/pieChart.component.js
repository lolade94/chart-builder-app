(function(){
  'use strict';

  angular.module('pieChart')
    .component('pieChart', {
      bindings: {
        data: '<',
        options: '<?'
      },
      controller: 'PieChartController',
      controllerAs:'vm',
      templateUrl:'src/components/chartBuilderTool/pieChart/pieChart.html'
    });
})();

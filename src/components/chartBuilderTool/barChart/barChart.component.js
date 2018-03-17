(function(){
  'use strict';

  angular.module('barChart')
    .component('barChart', {
      bindings: {
        data: '<',
        options: '<?'
      },
      controller: 'BarChartController',
      controllerAs: 'vm',
      templateUrl: 'src/components/chartBuilderTool/barChart/barChart.html'
    });
})();

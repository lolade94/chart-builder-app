(function(){
  'use strict';

  angular.module('chartBuilder')
    .component('chartBuilder', {
      bindings: {
        chartType: '<',
        options: '<?'
      },
      controller: 'chartBuilderController',
      controllerAs:'vm',
      templateUrl:'src/components/chartBuilderTool/chartBuilderView/chartBuilder.html'
    });
})();

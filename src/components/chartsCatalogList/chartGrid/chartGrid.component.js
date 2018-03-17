(function(){
  'use strict';

  angular.module('chartGrid')
    .component('chartGrid', {
      bindings: {
        data: '<',
        options: '<?'
      },
      controller: 'ChartGridController',
      controllerAs: 'vm',
      templateUrl: 'src/components/chartsCatalogList/chartGrid/chartGrid.html'
    });
})();

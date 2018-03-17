(function(){
  'use strict';

  angular.module('chartsView')
    .component('chartView', {
      bindings: {
        data: '<',
        options: '<?'
      },
      controller: 'ChartsViewController',
      controllerAs: 'vm',
      templateUrl: 'src/components/chartsCatalogList/chartsView/chartsView.html'
    });
})();

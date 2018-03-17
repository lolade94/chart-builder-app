(function(){
  'use strict';

  angular.module('chartList')
    .component('chartList', {
      bindings: {
        data: '<',
        options: '<?'
      },
      controller: 'ChartListController',
      controllerAs: 'vm',
      templateUrl: 'src/components/chartsCatalogList/chartList/chartList.html'
    });
})();

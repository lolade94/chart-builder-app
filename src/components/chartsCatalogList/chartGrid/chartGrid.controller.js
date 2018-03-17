(function() {
  'use strict';

  angular.module('chartGrid')
    .controller('ChartGridController', ['$scope', '$rootScope', '$document', '$element', 'FileSaver', 'D3ChartBuilder', ChartGridController]);

  function ChartGridController($scope, $rootScope, $document, $element, FileSaver, D3ChartBuilder) {

    var vm = this;
    vm.selected = [];
    vm.$onInit = function() {
      vm.charts = [];
      D3ChartBuilder.getCharts(function(data) {
        vm.charts = data;
      });
    };
    vm.updateChartView = function(id) {
      D3ChartBuilder.findOne(id);
    };

  }

})();

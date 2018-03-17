(function(){
  'use strict';

  angular.module('chartList')
    .controller('ChartListController',['$scope', '$document', '$element', 'FileSaver', 'D3ChartBuilder', ChartListController]);

  function ChartListController($scope, $document, $element, FileSaver, D3ChartBuilder) {

     var vm = this;


     vm.$onInit = function(){

      vm.chartTypes = [ "Bar Chart", "Line Chart", "Pie Chart", "Radar Chart"];
      vm.chartSelect = "";

       D3ChartBuilder.getCharts(function(data){
          vm.charts = data;
          console.log(vm.charts);
         });
     };

     vm.filterChart = function(chartType){
      vm.chartSelect = chartType;
    };

    vm.isSelected = function(chartType){
       return vm.chartSelect === chartType;
    };


  }

})();

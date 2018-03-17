(function(){
  'use strict';

  angular.module('chartsView')
    .controller('ChartsViewController',['$scope', '$document', '$element', 'FileSaver', ChartsViewController]);

  function ChartsViewController($scope, $document, $element, FileSaver) {

     var vm = this;
     var charts =[];

     vm.$onInit = function(){

     };

     vm.compareCharts = function(){
       console.log(charts);
       $scope.$broadcast('loadCharts', charts);
     };

     $scope.$on('compareCharts', function(event, data) {
          charts =  data;
          console.log(charts);
     });










  }

})();

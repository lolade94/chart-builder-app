(function() {
  'use strict';

  angular.module('chartBuilder')
    .controller('chartBuilderController', chartBuilderController);

  function chartBuilderController($scope, $element) {

    var vm = this;

    vm.tab = 1;

    vm.setTab = function(newTab) {
      vm.tab = newTab;
    };

    vm.isSet = function(tabNum) {
      return vm.tab === tabNum;
    };

  }
})();

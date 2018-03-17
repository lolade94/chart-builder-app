(function(angular) {

  'use strict';

  angular.module('service.chart-builder', [])
    .service('D3ChartBuilder', ['$http', D3ChartBuilder]);

  function D3ChartBuilder($http) {
    var charts = [];
    var createChart = function(config, callback) {
      $http.post('http://localhost:8888/api/createChart', config)
        .success(function(data) {
          callback(data);
          charts = data;
        }).error(function(err) {
          console.log("Can't add chart configuration." + " Error " + err);
        });
    };

    var getCharts = function(callback) {
      $http.get('http://localhost:8888/api/charts')
        .success(function(data) {
          callback(data);
        }).error(function(err) {
          console.log("Charts are unavailable. Start Node Server " + err);
        });
    };

    var getOneChart = function(id, callback) {
      var idObject = {
        chartId: id
      };
      $http.get('http://localhost:8888/api/charts/getChart/' + id)
        .success(function(data) {
          console.log(data);
          callback(data);
        }).error(function(err) {
          console.log("Charts are unavailable. Start Node Server " + err);
        });
    };

    var updateChart = function(config, callback) {
      $http.put('http://localhost:8888/api/charts/updateChart', config)
        .success(function(data) {
          console.log(data);
        }).error(function(err) {
          console.log("Charts are unavailable. Start Node Server " + err);
        });
    };

    return {
      saveChart: createChart,
      getCharts: getCharts,
      findOne: getOneChart,
      updateChart: updateChart
    };
  }


})(window.angular);

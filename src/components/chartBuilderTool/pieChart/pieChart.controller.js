(function() {
  'use strict';

  angular.module('pieChart')
    .controller('PieChartController', ['$scope', '$document', '$element', 'FileSaver', 'D3ChartBuilder', PieChartController]);

  function PieChartController($scope, $document, $element, FileSaver, D3ChartBuilder) {

    var vm = this;
    var chartJSON = [];
    vm.pieChartImg = "../../../src/assets/images/pie.png";
    vm.colors = ['#329af0', '#a3daff', '#1862ab'];
    vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    vm.fontStyleOptions = ["normal", "oblique", "bold", "italic"];
    vm.displayTitle = false;
    vm.positions = ["top", "left", "bottom", "right"];
    vm.data = [400, 100, 900];
    vm.datasetOverride = [{
        backgroundColor: '#329af0',
        borderWidth: 0,
        type: 'pie'
      },
      {
        backgroundColor: '#a3daff',
        borderWidth: 0,
        type: 'pie'
      },
      {
        backgroundColor: '#1862ab',
        borderWidth: 0,
        type: 'pie'
      }
    ];
    vm.options = {
      title: {
        display: false,
        position: "top",
        fontColor: "yellow",
        fontStyle: "normal",
        padding: 10,
        lineHeight: 1.2,
        text: "Bar Graph Title"
      },
      legend: {
        display: false,
        position: 'top',
        labels: {
          fontColor: '#fff',
          fontSize: 14
        }
      }
    };

    vm.$onInit = function() {
      $scope.$on('chart-create', function(event, instance) {
        $scope.chart = instance.chart;
      });
      $(".pie-chart .accordian ul .accord-group:first").css("display", "block");
      vm.fileUpload();
    };

    //Legend Settings
    vm.displayLegend = function(legend) {
      if (legend === true) {
        $scope.chart.options.legend.display = legend;
        $scope.chart.update();
      } else {
        $scope.chart.options.legend.display = legend;
        $scope.chart.update();
      }
    };

    vm.updateLegendColor = function(legendColor) {
      $scope.chart.options.legend.labels.fontColor = legendColor;
      $scope.chart.update();
    };

    vm.updateLegendStyle = function(legendSize) {
      $scope.chart.options.legend.labels.fontSize = legendSize;
      $scope.chart.update();
    };

    vm.updateLegendPosition = function(legendPosition) {
      $scope.chart.options.legend.position = legendPosition;
      $scope.chart.update();
    };

    //Title Settings
    vm.showTitle = function(title) {
      if (title === true) {
        $scope.chart.options.title.display = title;
        $scope.chart.update();
      } else {
        $scope.chart.options.title.display = title;
        $scope.chart.update();
      }
    };

    vm.updateChartTitle = function(title) {
      $scope.chart.options.title.text = title;
      $scope.chart.update();
    };

    vm.updateTitleColor = function(color) {
      $scope.chart.options.title.fontColor = color;
      $scope.chart.update();
    };

    vm.updateTitlePosition = function(position) {
      $scope.chart.options.title.position = position;
      $scope.chart.update();
    };

    vm.updateTitleSize = function(size) {
      $scope.chart.options.title.fontSize = size;
      $scope.chart.update();
    };

    vm.updateTitleStyle = function(fontStyle) {
      $scope.chart.options.title.fontStyle = fontStyle;
      $scope.chart.update();
    };

    vm.updateBGColor = function(color, index) {
      $scope.chart.data.datasets[0].backgroundColor[index] = color;
      $scope.chart.data.datasets[0].hoverBackgroundColor[index] = color;
      $scope.chart.update();
    };


   //Handle Form Functions
    vm.fileUpload = function() {
      $("#files").on('change', function(evt) {
        var files = evt.target.files;
        var fileData = [];
        if (files.length) {
          var reader = new FileReader();
          reader.onload = function(e) {
            var contents = e.target.result;

            var data = Papa.parse(contents, {
              header: true,
              skipEmptyLines: true,
            });
            var chartJSON = data.data[0];
            vm.labels = Object.keys(chartJSON);
            vm.data = Object.values(chartJSON);

            $scope.$apply(function() {
              vm.fileReader = contents;
            });
          };
          reader.readAsText(files[0]);
        }
      });
    };

    vm.exportImage = function() {
      var chartCanvas = $document.find('#pieChart')[0];
      chartCanvas.toBlob(function(blob) {
        var subject = vm.subject.split(" ").join("_");
        var person = vm.person.split(" ").join("_");
        FileSaver.saveAs(blob, person + "_" + subject + '.png');
      });
    };

    vm.submit = function() {

      var chartInfo = {
        "analyst": vm.person,
        "designer": vm.designer,
        "subject": vm.subject
      };

      var options = {
        title: $scope.chart.options.title,
        legend: $scope.chart.options.legend
      };

      var styles = $scope.chart.data.datasets.map(function(item) {
        return {
          "bgColor": item.backgroundColor,
          "hoverBgColor": item.hoverBackgroundColor
        };
      });

      var config = {
        chartAccount: chartInfo,
        chartType: "Pie Chart",
        chartData: vm.data,
        chartLabels: vm.labels,
        chartLogo: vm.pieChartImg,
        chartStyles: styles,
        chartOptions: options,
        chartTable: chartJSON
      };


      D3ChartBuilder.saveChart(config, function(data) {

        if (data !== null || data !== undefined) {

          //Empty chart account inputs
          vm.designer = "";
          vm.person = "";
          vm.subject = "";

          //Empty title input
          vm.displayTitle = false;
          vm.chartTitle = "";
          vm.titleColor = "";
          vm.titleSize = "";
          vm.titleStyle = "";
          vm.titlePosition = "";

          //Empty Legend inputs
          vm.showLegend = false;
          vm.legendPosition = "";
          vm.legendColor = "";
        }
      });


    }; //vm.submit

    vm.next = function(e) {
      var accordian = $(e.target).parent().parent().parent().next().find(".chart-title").next();
      $(".accordian ul .accord-group").slideUp();
      if (accordian.is(":hidden")) {
        accordian.slideDown();
      }
    };

    vm.previous = function(e) {
      var accordian = $(e.target).parent().parent().parent().prev().find(".chart-title").next();
      $(".accordian ul .accord-group").slideUp();
      if (accordian.is(":hidden")) {
        accordian.slideDown();
      }
    };


    $(".accordian h3").click(function(e) {
      $('.accordian h3').find('.fa.fa-plus open').toggleClass('open');
      $($(e.target).find('.fa.fa-plus').toggleClass('open'));
      $(".accordian ul .accord-group").slideUp();
      if ($(this).next().is(":hidden")) {
        $(this).next().slideDown();
      }
    });

  }
})();

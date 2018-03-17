(function() {
  'use strict';

  angular.module('updateChart')
    .controller('UpdateChartController', ['$scope', '$location', '$document', '$element', 'FileSaver', 'D3ChartBuilder', UpdateChartController]);

  function UpdateChartController($scope, $location, $document, $element, FileSaver, D3ChartBuilder) {

    var vm = this;
    var chartJSON = [];
    var id = $location.path().split("/").pop();
    vm.updateChartImg = "../../../src/assets/images/pie.png";
    vm.fontStyleOptions = ["normal", "oblique", "bold", "italic"];
    vm.positions = ["top", "left", "bottom", "right"];

    vm.$onInit = function() {
      $scope.$on('chart-create', function(event, instance) {
        // used to obtain chart instance
        vm.chart = instance.chart;
      });

      $(".pie-chart .accordian ul .accord-group:first").css("display", "block");

      vm.fileUpload();
      vm.loadChart();
    };

    vm.loadChart = function() {
      D3ChartBuilder.findOne(id, function(data) {
        vm.chartType = data.chartType;
        vm.chartLogo = data.chartLogo;
        if (vm.chartType === "Pie Chart") {
          buildLegend();
          vm.chart = {
            type: "pie"
          };
          var colors = {
            backgroundColor: data.chartStyles[0].bgColor,
            hoverBackgroundColor: data.chartStyles[0].hoverBgColor,
            borderWidth: 0
          };
          vm.datasetOverride = colors;
        } else if (vm.chartType === "Bar Chart") {
          vm.chart = {
            type: "bar"
          };
          vm.checkStacked = data.chartOptions.scales.yAxes[0].stacked;
            var styles = data.chartStyles.map(function(color, i) {
            var colorObj = {
              backgroundColor: color.bgColor,
              hoverBackgroundColor: color.hoverBgColor,
              borderWidth: 0
            };

            return colorObj;
          });
          vm.datasetOverride = styles;
          buildLabels();
        }
        buildChart();
        buildAccountandTitleForm();


        function buildChart() {
          vm.options = data.chartOptions;
          vm.series = data.chartSeries;
          vm.data = data.chartData;
          vm.labels = data.chartLabels;
        }

        function buildAccountandTitleForm() {
          vm.designer = data.chartAccount.designer;
          vm.person = data.chartAccount.analyst;
          vm.subject = data.chartAccount.subject;


          vm.displayTitle = data.chartOptions.title.display;
          vm.chartTitle = data.chartOptions.title.text;
          vm.titleColor = data.chartOptions.title.fontColor;
          vm.titleSize = data.chartOptions.title.fontSize;
          vm.titleStyle = data.chartOptions.title.fontStyle;
          vm.titlePosition = data.chartOptions.title.position;

        }

        function buildLabels() {
          vm.displayLabel = data.chartOptions.scales.yAxes[0].display;
          vm.xLabelString = data.chartOptions.scales.xAxes[0].scaleLabel.labelString;
          vm.yLabelString = data.chartOptions.scales.yAxes[0].scaleLabel.labelString;
          vm.labelColor = data.chartOptions.scales.yAxes[0].scaleLabel.fontColor;
          vm.labelSize = data.chartOptions.scales.yAxes[0].scaleLabel.fontSize;
          vm.labelStyle = data.chartOptions.scales.yAxes[0].scaleLabel.fontStyle;
        }

        function buildLegend() {
          vm.showLegend = data.chartOptions.legend.display;
          vm.legendColor = data.chartOptions.legend.labels.fontColor;
          vm.legendPosition = data.chartOptions.legend.position;
        }
      });
    };

    vm.displayLegend = function(legend) {
      if (legend === true) {
        vm.chart.options.legend.display = legend;
        vm.chart.update();
      } else {
        vm.chart.options.legend.display = legend;
        vm.chart.update();
      }
    };

    vm.updateLegendColor = function(legendColor) {
      vm.chart.options.legend.labels.fontColor = legendColor;
      vm.chart.update();
    };

    vm.updateLegendStyle = function(legendSize) {
      vm.chart.options.legend.labels.fontSize = legendSize;
      vm.chart.update();
    };

    vm.updateLegendPosition = function(legendPosition) {
      vm.chart.options.legend.position = legendPosition;
      vm.chart.update();
    };

    //Titles
    vm.showTitle = function(title) {
      if (title === true) {
        vm.chart.options.title.display = title;
        vm.chart.update();
      } else {
        vm.chart.options.title.display = title;
        vm.chart.update();
      }
    };

    vm.updateChartTitle = function(title) {
      vm.chart.options.title.text = title;
      vm.chart.update();
    };

    vm.updateTitleColor = function(color) {
      vm.chart.options.title.fontColor = color;
      vm.chart.update();
    };

    vm.updateTitlePosition = function(position) {
      vm.chart.options.title.position = position;
      vm.chart.update();
    };

    vm.updateTitleSize = function(size) {
      vm.chart.options.title.fontSize = size;
      vm.chart.update();
    };

    vm.updateTitleStyle = function(fontStyle) {
      vm.chart.options.title.fontStyle = fontStyle;
      vm.chart.update();
    };

    vm.updateBGColor = function(color, index) {
      if (vm.series.length !== 0) {
        vm.chart.data.datasets[index].backgroundColor = color;
        vm.chart.update();
      } else {
        vm.chart.data.datasets[0].backgroundColor[index] = color;
        vm.chart.data.datasets[0].hoverBackgroundColor[index] = color;
        vm.chart.update();
      }
    };

    vm.updateHoverColor = function(color, index) {
      vm.chart.data.datasets[index].hoverBackgroundColor = color;
      vm.chart.update();
    };


    //Labels
    vm.updateXLabel = function(labelVal) {
      vm.chart.options.scales.xAxes[0].scaleLabel.labelString = labelVal;
      vm.chart.update();
    };

    vm.displayLabels = function(label) {
      if (label === true) {
        vm.chart.options.scales.yAxes[0].scaleLabel.display = label;
        vm.chart.options.scales.xAxes[0].scaleLabel.display = label;
        vm.chart.update();
      } else {
        vm.chart.options.scales.yAxes[0].scaleLabel.display = label;
        vm.chart.options.scales.xAxes[0].scaleLabel.display = label;
        vm.chart.update();
      }
    };

    vm.updateYLabel = function(labelVal) {
      vm.chart.options.scales.yAxes[0].scaleLabel.labelString = labelVal;
      vm.chart.update();
    };

    vm.updateLabelColor = function(color) {
      vm.chart.options.scales.xAxes[0].scaleLabel.fontColor = color;
      vm.chart.options.scales.yAxes[0].scaleLabel.fontColor = color;
      vm.chart.update();
    };

    vm.updateLabelSize = function(size) {
      vm.chart.options.scales.yAxes[0].scaleLabel.fontSize = size;
      vm.chart.options.scales.xAxes[0].scaleLabel.fontSize = size;
      vm.chart.update();
    };

    vm.updateLabelStyle = function(fontStyle) {
      vm.chart.options.scales.yAxes[0].scaleLabel.fontStyle = fontStyle;
      vm.chart.options.scales.xAxes[0].scaleLabel.fontStyle = fontStyle;
      vm.chart.update();
    };

    vm.checkStackedStatus = function(stacked) {
      if (stacked === true) {
        vm.barChartImg = "../../../src/assets/images/stacked.png";
        vm.chartLogo = vm.barChartImg;
        vm.chart.options.scales.xAxes[0].stacked = stacked;
        vm.chart.options.scales.yAxes[0].stacked = stacked;
        vm.chart.update();
      } else {
        vm.barChartImg = "../../../src/assets/images/bar.png";
        vm.chartLogo = vm.barChartImg;
        vm.chart.options.scales.xAxes[0].stacked = stacked;
        vm.chart.options.scales.yAxes[0].stacked = stacked;
        vm.chart.update();
      }
    };



    vm.fileUpload = function() {

      $("#files").on('change', function(evt) {
        var files = evt.target.files;
        var fileData = [];
        var chartJSON = [];
        if (files.length) {
          var reader = new FileReader();
          reader.onload = function(e) {
            var contents = e.target.result;

            var data = Papa.parse(contents, {
              header: true,
              skipEmptyLines: true,
            });
            if (vm.chartType === "Bar Chart") {
              chartJSON = data.data;
              vm.labels = chartJSON.map(function(data, i) {
                var label = Object.keys(data)[0];
                return data[label];
              });

              vm.series = Object.keys(chartJSON[0]).slice(1);
            } else {
              chartJSON = data.data[0];
              vm.labels = Object.keys(chartJSON);
              vm.data = Object.values(chartJSON);
            }

            $scope.$apply(function() {
              vm.fileReader = contents;
            });
          };
          reader.readAsText(files[0]);
        }
      });
    };

    vm.exportImage = function() {
      var chartCanvas = $document.find('#update-chart')[0];
      chartCanvas.toBlob(function(blob) {
        var subject = vm.subject.split(" ").join("_");
        var person = vm.person.split(" ").join("_");
        FileSaver.saveAs(blob,  person + "_" + subject + '.png');
      });
    };

    vm.submit = function() {
      var chartInfo = {
        "analyst": vm.person,
        "designer": vm.designer,
        "subject": vm.subject
      };

      var options = {};
      if (vm.chartType === "Pie Chart") {
        options = {
          title: vm.chart.options.title,
          legend: vm.chart.options.legend
        };
      } else if (vm.chartType === "Bar Chart") {
        options = {
          title: vm.chart.options.title,
          scales: vm.chart.options.scales
        };
      }

      var styles = vm.chart.data.datasets.map(function(item) {
        return {
          "bgColor": item.backgroundColor,
          "hoverBgColor": item.hoverBackgroundColor
        };
      });

      var config = {
        _id: id,
        chartAccount: chartInfo,
        chartType: vm.chartType,
        chartData: vm.data,
        chartLogo: vm.chartLogo,
        chartLabels: vm.labels,
        chartSeries: vm.series,
        chartStyles: styles,
        chartOptions: options,
        chartTable: chartJSON
      };

      D3ChartBuilder.updateChart(config, function(data) {
        console.log("hey");
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

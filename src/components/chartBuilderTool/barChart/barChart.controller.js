(function() {
  'use strict';

  angular.module('barChart')
    .controller('BarChartController', ['$scope', '$document', '$element', 'FileSaver', 'D3ChartBuilder', BarChartController]);

  function BarChartController($scope, $document, $element, FileSaver, D3ChartBuilder) {

    var vm = this;
    var chartJSON = [];

    vm.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    vm.series = ['Series A', 'Series B'];
    vm.colors = ['#ca5828', '#ffd8a8'];
    vm.chartType = "Bar Chart";
    vm.barChartImg = '../../../src/assets/images/bar.png';
    vm.fontStyleOptions = ["normal", "oblique", "bold", "italic"];
    vm.positions = ["top", "left", "bottom", "right"];
    vm.displayLabel = false;
    vm.displayTitle = false;
    vm.data = [
      [25, 19, 85, 51, 86, 65, 70],
      [68, 82, 60, 33, 86, 77, 20]
    ];
    vm.datasetOverride = [{
        borderWidth: 0,
        hoverBackgroundColor: 'red',
        backgroundColor: '#ca5828',
        type: 'bar'
      },
      { borderWidth: 0,
        backgroundColor: '#ffd8a8',
        hoverBackgroundColor: 'blue',
        type: 'bar'
      }
    ];

    //Define additional options
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
      scales: {
        xAxes: [{
          stacked: false,
          gridLines: {
            display: false,
            lineWidth: 0.35,
            color: "#fff",
          },
          ticks: {
            display: true,
            fontColor: '#ccc',
            fontSize: 14,
            fontStyle: "normal",
            reverse: false
          },
          scaleLabel: {
            display: false,
            labelString: "x-axis label",
            fontColor: "red",
            fontSize: 14,
            fontStyle: "normal",
            fontFamily: "Verdana",
            padding: 4
          }
        }],
        yAxes: [{
          stacked: false,
          gridLines: {
            display: false,
            lineWidth: 0.35,
            color: "#fff"
          },
          ticks: {
            display: true,
            fontColor: '#ccc',
            fontSize: 14,
            reverse: false
          },
          scaleLabel: {
            display: false,
            labelString: "y-axis label",
            fontColor: "red",
            fontSize: 14,
            fontStyle: "normal",
            fontFamily: "Verdana",
            padding: 4
          }
        }]
      }
    };

    vm.$onInit = function() {
      $scope.$on('chart-create', function(event, instance) {
        vm.chart = instance.chart;
      });

      $(".accordian ul .accord-group:first").css("display", "block");
      vm.fileUpload();
    };

    vm.exportImage = function() {
      var chartCanvas = $document.find('#barChart')[0];
      chartCanvas.toBlob(function(blob) {
        if (vm.subject !== undefined && vm.person !== undefined) {
          var subject = vm.subject.split(" ").join("_");
          var person = vm.person.split(" ").join("_");

          FileSaver.saveAs(blob,  person + "_" + subject + '.png');
        } else {
          FileSaver.saveAs(blob, 'bar_chart.png');
        }

      });
    };

    vm.submit = function() {

      var chartInfo = {
        "analyst": vm.person,
        "designer": vm.designer,
        "subject": vm.subject
      };

      var options = {
        title: vm.chart.options.title,
        scales: vm.chart.options.scales
      };

      var styles = vm.chart.data.datasets.map(function(item) {
        return {
          "bgColor": item.backgroundColor,
          "hoverBgColor": item.hoverBackgroundColor
        };
      });

      var config = {
        chartAccount: chartInfo,
        chartType: 'Bar Chart',
        chartData: vm.data,
        chartSeries: vm.series,
        chartLabels: vm.labels,
        chartLogo: vm.barChartImg,
        chartStyles: styles,
        chartOptions: options,
        chartTable: chartJSON
      };

      //var serialized = JSON.stringify(vm.config);
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

          //Empty Label inputs
          vm.displayLabel = false;
          vm.xlabelString = "";
          vm.ylabelString = "";
          vm.labelColor = "";
          vm.labelStyle = "";
          vm.labelSize = "";


          //Clear Stacked
          vm.checkStacked = false;
        }
      });
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

    // Colors
    vm.updateBGColor = function(color, index) {
      vm.chart.data.datasets[index].backgroundColor = color;
      vm.chart.update();
    };

    vm.updateHoverColor = function(color, index) {
      vm.chart.data.datasets[index].hoverBackgroundColor = color;
      vm.chart.update();
    };

    vm.checkStackedStatus = function(stacked) {
      if (stacked === true) {
        vm.barChartImg = "../../../src/assets/images/stacked.png";
        vm.chart.options.scales.xAxes[0].stacked = stacked;
        vm.chart.options.scales.yAxes[0].stacked = stacked;
        vm.chart.update();
      } else {
        vm.barChartImg = "../../../src/assets/images/bar.png";
        vm.chart.options.scales.xAxes[0].stacked = stacked;
        vm.chart.options.scales.yAxes[0].stacked = stacked;
        vm.chart.update();
      }
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

    vm.fileUpload = function() {
      $('#barfiles').on('change', function(evt) {
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
            chartJSON = data.data;

            vm.labels = chartJSON.map(function(data, i) {
              var label = Object.keys(data)[0];
              return data[label];
            });

            vm.series = Object.keys(chartJSON[0]).slice(1);
            vm.tableHead = Object.keys(chartJSON[0]);
            var dataArray = [];

            for (var i = 0; i < vm.series.length; i++) {
              dataArray.push(new Array(chartJSON.length).fill(null));
            }

            chartJSON.map(function(data, i) {
              var label = Object.keys(data)[0];
              var arr = _.omit(data, label);
              for (var j = 0; j < vm.series.length; j++) {
                dataArray[j][i] = arr[vm.series[j]];
              }
            });
            vm.data = dataArray;
            $scope.$apply(function() {
              vm.fileReader = contents;
            });
          };
          reader.readAsText(files[0]);
        }
      });
    };

  }

})();

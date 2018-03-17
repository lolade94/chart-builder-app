var mongoose = require('mongoose');
var Chart = require('../models/ChartConfig.js');


module.exports = (function(app) {

  app.post('/api/createChart', function(req, res) {
    Chart.create({
      chartAccount: req.body.chartAccount,
      chartType: req.body.chartType,
      chartData: req.body.chartData,
      chartLogo: req.body.chartLogo,
      chartLabels: req.body.chartLabels,
      chartSeries: req.body.chartSeries,
      chartOptions: req.body.chartOptions,
      chartStyles: req.body.chartStyles
    }, function(err) {
      if (err) {
        res.send(err);
      } else {
        Chart.find(function(error, charts) {
          if (error) {
            res.send(error);
          } else {
            res.json(charts);
          }
        });
      }
    });
  }); //post

  app.get('/api/charts', function(req, res) {
    Chart.find({}, function(err, charts) {
      if (err) {
        res.send(error);
      } else {
        res.json(charts);
      }
    });
  }); //get chart

  app.get('/api/charts/getChart/:chart_id', function(req, res) {
    Chart.findOne({
      _id: req.params.chart_id
    }, function(err, chart) {
      if (err) {
        res.send(error);
      } else {
        res.json(chart);
      }
    });
  });

  app.put('/api/charts/updateChart', function(req, res) {
    var id = req.body._id;

    var chart = {
      chartAccount: req.body.chartAccount,
      chartType: req.body.chartType,
      chartData: req.body.chartData,
      chartLogo: req.body.chartLogo,
      chartLabels: req.body.chartLabels,
      chartSeries: req.body.chartSeries,
      chartOptions: req.body.chartOptions,
      chartStyles: req.body.chartStyles
    };

    Chart.findOneAndUpdate({
      _id: id
    }, chart, {
      upsert: true
    }, function(err, obj) {
      if (err) {
        throw err;
      } else {
        res.json(obj);
      }
    });
  }); //update

});//module export

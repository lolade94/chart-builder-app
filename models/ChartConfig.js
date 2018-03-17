var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var ChartSchema = new Schema({
    chartAccount: {
      "analyst": String,
      "designer": String,
      "subject": String
    },
    chartType: String,
    chartLogo: String,
    chartLabels: Array,
    chartData: Array,
    chartStyles: Array,
    chartSeries: Array,
    chartOptions: {},
    chartTable:[],
    date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Chart', ChartSchema, 'charts');

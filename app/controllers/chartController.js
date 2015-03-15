var chartModel = require('../models/chartModel'),
    processor = require('../processor'),
    stringUtils = require('../utils/strings'),

    chartControler = {};

chartControler.newChartForm = function (req, res) {
    res.render('newChart.html', {pageTitle: 'New Song'}); // to do: replace the view object with a class
};

chartControler.postNewChart = function (req, res) {
    chartModel.update(req.body.name, processor.chordChart(req.body.chart))
        .then(function () {
            res.redirect('/chart/view/' + stringUtils.toUrl(req.body.name));
        }, function (err) {
            res.send(err);
        });
};

chartControler.listAction = function (req, res) {
    chartModel.list()
        .then(function (list) {
            res.render('chartList.html', {
                pageTitle: 'Songs List',
                songsList: list
            });
        }, function (err) {
            res.send(err);
        });
};

chartControler.viewChart = function (req, res) {
    chartModel.getChart(req.params.chartName)
        .then(function (chart) {
            res.render('chart.html', {
                pageTitle: chart.title + ' (View)',
                song: chart
            });
        }, function (err) {
            res.send(err);
        });
};

module.exports = chartControler;
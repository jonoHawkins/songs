var Promise = require('promise'),
    fs = require('fs'),
    stringUtils = require('../utils/strings'),
    config = require('../config'),
    chartModel = {};

function _nameToFile(name) {
    return stringUtils.urlSafe(name).replace(/\s/g, '-').toLowerCase() + '.json';
}

function _writeChart(name, chart, flag) {
    flag = flag || 'wx';

    var data = {
        title: name,
        chart: chart
    };

    data = JSON.stringify(data, null, 4);

    return new Promise(function (fulfill, reject) {
        fs.writeFile(config.charts.folder + '/' + _nameToFile(name), data, {flag: flag}, function (err) {
            if (err) {
                reject(err);
            } else {
                fulfill();
            }
        });
    });
}

chartModel.new = function (name, chart) {
    return _writeChart(name, chart, 'wx');
};

chartModel.update = function (name, chart) {
    return _writeChart(name, chart, 'w');
};

chartModel.getChart = function (name) {
    return new Promise(function (fulfill, reject) {
        fs.readFile(config.charts.folder + '/' + _nameToFile(name), {encoding: 'utf8'}, function (err, data) {
            if (err) {
                reject(err);
            } else {
                fulfill(JSON.parse(data));
            }
        });
    });
};

chartModel.list = function () {
    return new Promise(function (fulfill, reject) {
        fs.readdir(config.charts.folder, function (err, files) {
            if (err) {
                reject(err);
            } else {
                var fileNames = [];
                files.forEach(function (val, index, arr) {
                    if (val.match(/\.json$/)) {
                        fileNames.push({
                            link: val.replace(/\.json$/, ''),
                            title: val.replace(/\.json$/, '') // to do: read title from file
                        });
                    }
                });
                fulfill(fileNames);
            }
        });
    });
};

module.exports = chartModel;
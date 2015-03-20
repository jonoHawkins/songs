var Promise = require('promise'),
    fs = require('fs'),
    stringUtils = require('../utils/strings'),
    FolderCache = require('../classes/FolderCache'),
    config = require('../config').charts,

    _chartFolderCache = new FolderCache(config.folder),

    chartModel = {};

// Needs an update... this will require an ID as we could be modifying the title.

chartModel.new = function (title, chart) {
    var chart = _chartFolderCache.getFile('title', title);

    if (chart) {
        return new Promise(function (f, r) {
            r('Already exists');
        });
    }

    return _chartFolderCache.newFile({
        title: title,
        chart: chart
    });
};

chartModel.getChart = function (title) {
    return new Promise(function (fulfill, reject) {
        var chart = _chartFolderCache.getFile('title', title);

        if (chart) {
            fulfill(chart);
        } else {
            reject('Chart not found');
        }
    });
};

chartModel.list = function () {
    return new Promise(function (fulfill, reject) {
        fulfill(_chartFolderCache.getFiles());
    });
};

module.exports = chartModel;
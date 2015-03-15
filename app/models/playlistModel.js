var Promise = require('promise'),
    fs = require('fs'),
    stringUtils = require('../utils/strings'),
    config = require('../config').playlists,

    playlistModel = {};

function _nameToFile(name) {
    return stringUtils.urlSafe(name).replace(/\s/g, '-').toLowerCase() + '.json';
}

playlistModel.getPlaylist = function (name) {
    return new Promise(function (fufill, reject) {
        fs.readFile(config.folder + '/' + _nameToFile(name), {encoding: 'utf8'}, function (err, data) {
            if (err) {
                reject(err);
            } else {
                fufill(JSON.parse(data));
            }
        });
    });
};

module.exports = playlistModel;
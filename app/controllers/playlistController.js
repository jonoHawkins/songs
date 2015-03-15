var playlistModel = require('../models/playlistModel'),
    chartModel = require('../models/chartModel'),

    playlistControler = {};

playlistControler.viewPlaylist = function (req, res) {
    playlistModel.getPlaylist(req.params.playlist)
        .then(function (playlist) {
            res.send(playlist);
        }, function (err) {
            res.send(err);
        });
};

playlistControler.viewPlaylistPage = function (req, res) {
    var pageId = Number(req.params.page),
        playlist;

    playlistModel.getPlaylist(req.params.playlist)
        .then(function (pl) {
            playlist = pl;
            return chartModel.getChart(playlist.songs[pageId].name);
        }, function (err) {
            res.send(err);
        })
        .then(function (chart) {
            res.render('playlistChart.html', {
                err: false,
                pageTitle: chart.title + ' - Playlist: ' + playlist.title,
                song: chart,
                playlist: playlist,
                page: pageId,
                nextPage: pageId + 1 < playlist.songs.length ? pageId + 1 : 0,
                prevPage: pageId - 1 >= 0 ? req.params.page - 1 : playlist.songs.length - 1
            });
        }, function (err) {
            res.render('playlistChart.html', {
                err: err,
                pageTitle: 'Unfound - Playlist: ' + playlist.title,
                song: false,
                playlist: playlist,
                page: pageId,
                nextPage: pageId + 1 < playlist.songs.length ? pageId + 1 : 0,
                prevPage: pageId - 1 >= 0 ? req.params.page - 1 : playlist.songs.length - 1
            });
        });
};

module.exports = playlistControler;
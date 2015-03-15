var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.sendFile('html/index.html');
});

router.get('/chart', require('./controllers/chartController').listAction);
router.get('/chart/new', require('./controllers/chartController').newChartForm);
router.post('/chart/new', require('./controllers/chartController').postNewChart);
router.get('/chart/view/:chartName', require('./controllers/chartController').viewChart);

router.get('/playlist/:playlist/:page', require('./controllers/playlistController').viewPlaylistPage);
router.get('/playlist/:playlist', require('./controllers/playlistController').viewPlaylist);


module.exports = router;
var express = require('express');
var router = express.Router();
var dubya = require('../bin/www');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var watchID = parseInt(req.query.watch, 10); //req.query.watch is the NFC tag ID

	if(watchID > 19) { //Just in case we get an invalid watch ID
		watchID = 1;
	}
	console.log(watchID);
	dubya.app.queryDB(watchID, function(result) {
		dubya.wss.broadcast(JSON.stringify({msgType:"facetDeviceConnected", msg:{watchInfo:result}}));
	});
	res.send('You done pinged the server, now the websocket will send a message to listening clients.');
});

module.exports = router;

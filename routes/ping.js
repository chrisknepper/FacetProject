var express = require('express');
var router = express.Router();
var dubya = require('../bin/www');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var tagID = parseInt(req.query.watch, 10); //req.query.watch is the NFC tag ID

	if(tagID > 19) { //Just in case we get an invalid watch ID
		tagID = 1;
	}
	console.log(tagID);
	dubya.app.getWatchIDFromTag(tagID, function(result) {
        console.log("in ping router")
		dubya.wss.broadcast(JSON.stringify({msgType:"facetDeviceConnected", msg:{watchInfo:result}}));
	});
	res.send('You done pinged the server, now the websocket will send a message to listening clients.');
});

module.exports = router;

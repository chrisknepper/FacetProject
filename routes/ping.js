var express = require('express');
var router = express.Router();
var dubya = require('../bin/www');

/* GET users listing. */
router.get('/', function(req, res, next) {
	dubya.wss.broadcast(JSON.stringify({msgType:"facetDeviceConnected", msg:{watchID:req.query.watch}}));
	res.send('You done pinged the server, now the websocket will send a message to listening clients.');
});

module.exports = router;

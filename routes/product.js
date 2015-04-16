var express = require('express');
var router = express.Router();
var dubya = require('../bin/www');

router.get('/', function(req, res, next) {
	res.render('product', {productTitle: 'Default Title', productCollection: 'Default Collection'});
});

router.get('/:id', function(req, res, next) {
	var productid = req.params.id;
	dubya.app.getProductInfo(productid, function(result) {
		res.render('product', {productTitle: result.name, productCollection: result.collection});
	});

});

module.exports = router;
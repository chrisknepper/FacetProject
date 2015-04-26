var express = require('express');
var router = express.Router();
var dubya = require('../bin/www');

router.get('/', function(req, res, next) {
	res.render('product', {productTitle: 'Default Title', productCollection: 'Default Collection', frequency:'3600'});
});

router.get('/:id', function(req, res, next) {
	var productid = req.params.id;
	dubya.app.getProductInfo(productid, function(result) {
        console.log("product router: "+result);
        
		res.render('product', {productTitle: result.name, productCollection: result.collection, frequency:result.frequency});
	});

});

module.exports = router;
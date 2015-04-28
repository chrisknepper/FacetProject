var express = require('express');
var router = express.Router();
var dubya = require('../bin/www');

router.get('/', function(req, res, next) {
    //res.render('timeline', {specs:{name: 'Default Title', collection: 'Academy', frequency:'3600', name:'Lightweight', shortname:" short", thumb:"imgurl", largeImg:"imgurl",model:"modelurl", price:"8,500", movement:"El Primero Automatic 45B", calibre:"13 1/4", thickness:"7.35", components:"341", jewels:"53", frequency:"28800", powerReserve:"Min 50 hrs.", finishing:"Shiny", icon:"Felix", material:"stainless steel", diameter: "43", crystal:"domed sapphire", caseBack:"transparent mythril", strap:"Black alligator leather", clasp:"Stainless Steel", waterResistance:"8", variations:"6", productionModel:"2013" }});
    var year = 1925;
	dubya.app.getDateInfo(year, function(result) {
       var imgurl="images/"+result.img;
       
		res.render('timeline', {specs:result, img:imgurl});
        
	});
});
router.get('/:id', function(req, res, next) {
	var year = req.params.id;
	dubya.app.getDateInfo(year, function(result) {
        var imgurl="images/"+result.img;
       // document.getElementById('timeimg').src=imgurl;
		res.render('timeline', {specs:result, img:imgurl});
	});
});
module.exports = router;
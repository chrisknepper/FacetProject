//import the controller folder (automatically calls the index.js file)
var controllers = require('./controllers'); 

var router = function(app) {

    app.get("/simulate", controllers.Product.updateProduct); 
   
};

module.exports = router; 
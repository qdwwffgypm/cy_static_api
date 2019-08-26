var app = require('express')();
var static = require('express-static');
var port = "8080";
app.use(static(__dirname + '/'))
app.listen(port, function() {
    console.log('http://localhost:'+port+'/standard/libs/cache.html')
});

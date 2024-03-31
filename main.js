var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    dataParsed={"response":400}
    response.end(JSON.stringify(dataParsed));
});
app.listen(8080);
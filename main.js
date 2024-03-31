var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    response.writeHead(200);
    dataParsed={"response":200}
    response.end(JSON.stringify(dataParsed));
});
app.listen(8080);
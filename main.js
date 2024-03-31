var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url=='/'){
        url=''
    }
    if(request.url=='/favicon.ico'){
        return response.writeHead(404);
    }
    response.writeHead(200);
    dataParsed={"response":200}
    response.end(JSON.stringify(dataParsed));
});
app.listen(8080);
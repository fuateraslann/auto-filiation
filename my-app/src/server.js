var express=require('express');
var path=require('path');
var app=express();
var port=5000;
app.get('/',function(req,res){
    res.send('<html><body><h2>a!!!sssss s a</h2</body></html>');
});
app.get('/api',function(req,res){
    res.send('<p>This is a api Data</p>');
});
app.listen(port,function(error){
    if(error) {
        console.log(error);
    } else {
        console.log("a s on port: "+port);
    }
})
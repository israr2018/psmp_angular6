//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('../dist/psms'));

app.get('/*', function(req,res) {
    console.log("_dirname",__dirname);
res.sendFile(path.join(__dirname,'../dist/psms/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080,function(req,res){
//console.log("server .js is running on port 4200");
});
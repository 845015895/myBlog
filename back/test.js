let fs = require("fs");
fs.readdir("./md/",function(err, files){
    if (err) {
        return console.error(err);
    }
    files.forEach( function (file){
        console.log( file );
    });
});
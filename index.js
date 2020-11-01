const http = require('http');
const https = require('https');
const lbl = require('line-by-line');

const txt = new lbl('index.md');
console.log(txt);

let errorObj = {};

txt.on('line', function (line) {

    if (line.startsWith("https")){
        https.get(line.split(" ")[0], (res) => {
            if (res.statusCode !== "200") {
                errorObj[res.statusCode] = res.url;
            }
        }).on('error', (e) => {
            console.error(e);
        });
    } else if (line.startsWith("http")){

        http.get(line.split(" ")[0], (res) => {
            if (res.statusCode !== "200") {
                errorObj[res.statusCode] = res.url;
            }
        }).on('error', (e) => {
            console.error(e);
        });
    } 

    console.log(errorObj);
});
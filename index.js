const http = require('http');
const https = require('https');
const lbl = require('line-by-line');

const txt = new lbl('index.md');
let errorObj = {};

txt.on('line', function (line) {

    if (line.startsWith("https")){

        const options = {
            hostname: encodeURI(line.split(" ")[0]),
            rejectUnauthorized: false,
            method: 'GET'
        };

        https.get(options, (res) => {
            if (res.statusCode !== 200) {
                setTimeout(()=>{
                    errorObj[res.statusCode + line.split(" ")[0]] = line.split(" ")[0];
                }, 10)
            }
        }).on('error', (e) => {
            console.error(e);
        });
    } else if (line.startsWith("http")){

        const options = {
            hostname: line.split(" ")[0],
            rejectUnauthorized: false,
            method: 'GET'
        };

        http.get(options, (res) => {
            if (res.statusCode !== 200) {
                setTimeout(()=>{
                    errorObj[res.statusCode + line.split(" ")[0]] = line.split(" ")[0];
                }, 10)            }
        }).on('error', (e) => {
            console.error(e);
        });
    } 
});

console.log("help me");
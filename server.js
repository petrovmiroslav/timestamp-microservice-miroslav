// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
/****************/

function echoServer(req, res) {
  let result;
  let isInvalid;
  const date_string = req.params.date_string;
  console.log(new Date(date_string));
  if(req.params.date_string==undefined) {
    result = new Date();
     } else {
         if(new Date(date_string)!="Invalid Date") {
           result = new Date(date_string);
         } else {
            if(Number.isNaN(Number(date_string))) {isInvalid = true;}
           result = new Date(Number(date_string));
         }
       }
  if(isInvalid) {res.json({"error" : "Invalid Date" })}
  else {
    res.json({"unix": result.getTime(), "utc" : result.toUTCString() });
  }
}
app.route("/api/timestamp/:date_string?").get(echoServer);







/****************/


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

const express = require('express');
const app = new express();
const path = require('path');
const mysql = require('mysql');
const ejs = require('ejs');
const res = require('express/lib/response');
const PORT = process.env.PORT || 3000;


/**
 * Init Alpha Vantage with your API key.
 *
 * @param {String} key
 *   Your Alpha Vantage API key.
 */
 const alpha = require('alphavantage')({ key: '2R4U55YO6G05KX6E' });



//middleware function init
//body parser
app.use(express.json());
app.use(express.urlencoded({extended:true})); //to parse html form data

//Initialize ejs middleware
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static('views'));
//app.set("views", path.join(__dirname, "/views"));    //https://stackoverflow.com/questions/51844617/cannot-get-blah-html-ejs-cant-load-html/51845208


app.get("/", (req,res) => {
   res.render('index');
});


/*
alpha.data.intraday(`tsla`).then((data) => {
    console.log(data);

    const polished = alpha.util.polish(data);
  });
*/

//alpha.data.daily(symbol, outputsize, datatype, interval);


const tsla_dicts = [];

function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element)
}

'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key


var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=15min&apikey=2R4U55YO6G05KX6E';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
      tsla_dicts.push(data);
    }
});
tsla_dicts.forEach(logArrayElements)


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "tsla" // comment out if running example 1
});


// Establish connection with the DB
db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Successful connected to the DB....`);
  }
});


app.listen(PORT, () => console.log('Server listening on port ' + PORT));
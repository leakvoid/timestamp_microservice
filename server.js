
/* initialization */
var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

/* utility */
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function matchExact(r, str) {
   var match = str.match(r);
   return match != null && str == match[0];
}

/* server routing */
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/static_pages/about.html');
});

app.get('/favicon.ico', function(req, res) {
    console.log('piss off, favicon!');
    res.end('piss off, favicon!');
});

app.get('/:p', function(req, res) {
    var param = req.params.p;
    console.log("passed URL param: " + param);

    /* convert URL param to Date object */
    if( matchExact(/[0-9]+/, param) ) {
	console.log('unixtime request');
	date = new Date( parseInt(param) * 1000 );
    } else {
	console.log('plain string request');
	date = new Date( param );
    }

    /* date validation */
    if( isNaN(date.getTime()) ) {
	res.json({
            'unix_timestamp': null,
            'natural_language': null
	});

	console.log('ERROR: incorrect date');
	return;
    }

    /* generating result JSON */
    var f_date = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

    res.json({
	'unix_timestamp': date.getTime() / 1000,
	'natural_language': f_date
    });
});

app.use(function(req, res) {
    res.json({
        'unix_timestamp': null,
        'natural_language': null
    });
});

app.listen(port, function() {
    console.log("App is running on port: " + port);
});

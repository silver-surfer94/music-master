var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	request({
		url: 'https://accounts.spotify.com/api/token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic NGNjMDIwZjM1NTlmNDJmYzhhZmRjODQzNjcwNDRiNGE6YjE0OTZiYzdhZjkyNDNhZmFhMzIxYTY5MWRlMmFkOWM='
		},
		json: true,
		body: 'grant_type=client_credentials'
	}, function(error, response, body) {
		if (error) console.log(error);
		res.json(body);
	});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var config = require('config');
// var serverType = config.get('serverType');
var serverType = 'bitcoind';
var rpcConfig = config.get('rpcConfig');
var colors = config.get('colors');
var apicache = require('apicache').options({ debug: true }).middleware;
var geoip = require('geoip-lite');




/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});
router.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });



router.get('/getpeerinfo', apicache('3 seconds'), function(req, res, next) {
	switch (serverType) {
		case 'btcd':
			btcd.getpeerinfo(function(err, info, resHeaders) {
				if (err) return console.log(err);
				btcd.getnettotals(function(err, nettotals, resHeaders) {
					if (err) return console.log(err);
					var maxTransferred = 0;
					for (var i = 0; i < info.length; i++){
						maxTransferred = Math.max(maxTransferred, (info[i].bytessent + info[i].bytesrecv));
						// var geo = geoip.lookup(info[i].addr.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g));
						// console.log("Geo:", geo);
					};
					res.header("Access-Control-Allow-Origin", "*");
					res.json({
						"data": info,
						"colors": colors,
						"nettotals": nettotals,
						"maxTransferred": maxTransferred
					});
				});
			});
			break;
		case 'bitcoind':
			req.client.cmd('getpeerinfo', function(err, info, resHeaders) {
				if (err) return console.log(err);
				req.client.cmd('getnettotals', function(err, nettotals, resHeaders) {
					if (err) return console.log(err);
					var maxTransferred = 0;
					for (var i = 0; i < info.length; i++){
						maxTransferred = Math.max(maxTransferred, (info[i].bytessent + info[i].bytesrecv));

						info[i].geo = getGeo(info[i].addr);
						// console.log("Geo:", info[i].geo);

					};
					res.header("Access-Control-Allow-Origin", "*");
					res.json({
						"data": info,
						"colors": colors,
						"nettotals": nettotals,
						"maxTransferred": maxTransferred
					});
				});
						});
			// var nettotals = config.rpcConfig.sampleData.getnettotals;

			break;
		case 'sampledata':
			{
				console.log("acessing sampledata...");
				var info = config.rpcConfig.sampleData.getpeerinfo;
				var nettotals = config.rpcConfig.sampleData.getnettotals;
				var maxTransferred = 0;
				for (var i = 0; i < info.length; i++){
					maxTransferred = Math.max(maxTransferred, (info[i].bytessent + info[i].bytesrecv));
				};
			};
			res.header("Access-Control-Allow-Origin", "*");
	res.json({
		"data": info,
		"colors": colors,
		"nettotals": nettotals,
		"maxTransferred": maxTransferred
	});
	}
});

function getGeo(address) {
	var rawip = address.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g);
	var ip;
	if (rawip) {
		ip = rawip.toString();
	} else {
		ip = "0.0.0.0";
	}
	// console.log("ip:", ip);
	var geo = geoip.lookup(ip);
	// console.log("Geo:", info[i].geo);
	return geo;
}


module.exports = router;

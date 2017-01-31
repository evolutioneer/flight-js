var cla = require('command-line-args'),
    dateFormat = require('dateformat'),
    _ = require('lodash'),
    request = require('request'),
    Promise = require('bluebird'),
    Xray = require('x-ray'),
    phantom = require('x-ray-phantom'),
    tough = require('tough-cookie'),
    debug = require('debug')('flightsearch-js'),

	fsjsModules = {
	  delta: {
            cookieUrl: 'http://www.delta.com/',
            method: 'POST',
            url: 'http://www.delta.com/flightinfo/viewFlightStatus.action',
            headers: {
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.8',
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
              'requestingSite': 'polaris_athens',
              'searchOptionValue': 'CITYPAIR',
              'flightDate': '2017-01-30',
              'flightNumber': '',
              'departureAirport': 'DTW',
              'arrivalAirport': 'SEA',
              ':cq_csrf_token': 'undefined'
            },
            dateFormat: 'yyyy-mm-dd'
	  }
	};

//request = Promise.promisify(request);
//Promise.promisifyAll(request);

debug(fsjsModules.delta);

var x = Xray()
  .driver(phantom());

// TODO invoke scraper with module's scraper function
// var cookieJar = new tough.CookieJar();

request({
    url: fsjsModules.delta.cookieUrl,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
    },
  },
  function(err, response, body) {
    debug('Response: ', response);
    debug('Body: ', body);
});



















  ;

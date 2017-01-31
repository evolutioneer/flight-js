var debug = require('debug')('flight-js-modules');

module.exports = {
  _common: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
    }
  },
  delta: {
    scraper: function($) {
      debug('-----------> in the scraper');
      return $('title').text();
    },
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
      'flightDate': '%date%',
      'flightNumber': '',
      'departureAirport': '%from%',
      'arrivalAirport': '%to%',
      ':cq_csrf_token': 'undefined'
      },
    dateFormat: 'yyyy-mm-dd'
  }
};


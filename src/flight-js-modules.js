var debug = require('debug')('flight-js-modules');

module.exports = {
  _common: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
    }
  },
  delta: {
    // scraperjs scraper function
    scraper: function($) {
      return $('#flightschedulesResults tbody.schedulesTableBody tr').map(function() {
        var $row = $(this),
          row = {
            fNum: getText.call($(this), 'th form a'),
            dPort: getText.call($(this), ['td.schedulesTableCell', 0], 'a span.schedules_airport_code'),
            dDate: getText.call($(this), ['td.schedulesTableCell', 1], 'span'),
            aPort: getText.call($(this), ['td.schedulesTableCell', 2], 'a span.schedules_airport_code'),
            aDate: getText.call($(this), ['td.schedulesTableCell', 3], 'span'),
            craft: getText.call($(this), ['td.schedulesTableCell', 4], 'span'),
            tripTime: getText.call($(this), ['td.schedulesTableCell', 9], 'span'),
            status: getText.call($(this), ['td.schedulesTableCell', 10])
          };

        debug(JSON.stringify(row));
        return row;
      }).get();
    },

    // HTTP request parameters
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

// Handles some common tasks with locating and trimming values
function getText() {

  var that = this;

  for(var i = 0; i < arguments.length; i++) {
    var a = arguments[i];

    if(typeof a == 'object' && a.constructor === Array) {
      if(a.length > 1) {
        that = that.find(a[0]).eq(a[1]);
      }

      else {
        a = a[0];
      }
    }

    if(typeof a == 'string') {
      that = that.find(a);
    }
  }

  return that
    .contents()
    .filter(function() {
      return this.nodeType === 3;
    })
    .text()
    .replace(/[\t\r\n ]+/g, ' ');
}

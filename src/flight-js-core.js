var scraperjs = require('scraperjs'),
    dateFormat = require('dateformat'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    debug = require('debug')('flight-js-core');

function scrapeDate(options, modules) {
  debug('scrapeDate()');

  var promises = [],
    carrierCt = options.carrier.length,
    fOptions = _.extend({}, options, { date: new Date(options.date) });

  // scraperjs.DynamicScraper.startFactory();

  _.each(fOptions.carrier, function(name, i, col) {
    if(modules[name] == null) {
      debug('ERROR 1: Carrier "' + name + '" not found in module set; continuing');
      return;
    }

    var fModule = _.extend({}, modules[name], { carrier: name }, modules._common),
      promise = scrapeCarrier(fOptions, fModule);

    promises = _.concat(promises, promise);
  });

  // TODO rotate old output file to history folder

  // TODO write results to output file: carrier-date-from-to.csv; include timestamp and
  // other meta-data in first data row as a header

  // close phantomjs
  // scraperjs.DynamicScraper.closeFactory();

  return Promise.all(promises);
}

function scrapeCarrier(options, module) {
  debug('scrapeCarrier()');

  var promises = [];
  _.each(options.from, function(fromAirport, i, col) {

    var filterBy = _.extend({}, options, {
        from: fromAirport,
        date: dateFormat(options.date, module.dateFormat)
      });

    // Unset special values
    delete filterBy.scraper;

    // Inject values
    var fOptions = _.extend({}, module, {
        uri: filter(module.url, filterBy),
        headers: filter(module.headers, filterBy),
        form: filter(module.form, filterBy)
      });

    var promise = scraperjs.StaticScraper.create().request(fOptions)
      .scrape(module.scraper)
      .then(function(feed) {
        debug('+++ Feed from %s: %s', options.carrier, feed);
      })
      .done(function() {
        debug('+++ Done');
      })
      .timeout(5000, function() {
        debug('!!! Timed out after 5s');
      })
      .catch(function(err) {
        debug("!!! Error", err);
      });

    promises = _.concat(promises, promise);
  });

  // debug('... scrapeCarrier promises: ', promises.length);
  return Promise.all(promises);
}

// Injects a string or an array with values from baseValues, optionally overridden
// with overrideValues.
function filter(tplInput, values) {
  var  out = null;

  if(tplInput == null || tplInput == '') {
    debug('... empty, returning empty string');
    return '';
  }

  if(typeof tplInput == 'string') {
    out = filterString(tplInput, values);
  }

  else {
    out = JSON.parse(filterString(JSON.stringify(tplInput), values));
  }

  // debug('filterValues()', out);
  return out;
}

function filterString(input, values) {

  var out = input;

  _.each(values, function(value, key, col) {
    out = _.replace(out, '%' + key + '%', value);
  });

  // debug('filterString()', out);
  return out;
}

module.exports = {
  scrape: scrapeDate
};


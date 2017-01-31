var cla = require('command-line-args'),
    fsjs = require('./flight-js-core.js'),
    fsjsModules = require('./flight-js-modules.js'),
    optionDefs = [
      { name: 'from', alias: 'f', type: String, multiple: true },
      { name: 'to', alias: 't' },
      { name: 'date', alias: 'd', type: String },
      { name: 'carrier', alias: 'c', type: String, multiple: true }
    ],
    cmdOptions = cla(optionDefs);

fsjs.scrape(cmdOptions, fsjsModules)
  .then(function() {
    process.exit(0);
  });

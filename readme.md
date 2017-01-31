# Flight JS

This is a simple working example of an airline flight status web scraper written in node.

The script accepts command line options and currently yields results as `debug()`
statements.

You can run the script in bash with:
`cd src`
`./test.sh`

## Command Line Interface

The command line interface accepts these parameters:

- `--from, -f` - the departure airport code, ex. DTW, SEA
- `--to, -t` - the arrival airport code
- `--carrier, -c` - the keyword identifying the carrier to scrape (currently only `delta`)
- `--date, -d` - the date to check for flight information in yyyy-mm-dd format

Note that currently you must prepend your `node` command with `DEBUG=flight-js*` to see
the received output in `debug`.

The example command run in test.sh is:

`DEBUG=flight-js* node flight-js.js -f DTW -t SEA -c delta -d 2017-01-31`

## What Next

This probably looks like a dumpster fire to a proper node developer.
If you want to help, [check out this
Trello](https://trello.com/b/xYkOjli3/flight-scraper-js) for open to-dos.



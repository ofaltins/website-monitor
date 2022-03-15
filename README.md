# Website monitor

Configurable website monitors that uses Puppeteer to listen for specific changes on websites.

## Installation

`npm i`

## Usage

Run all monitors headless on schedule:

`npm start`

Run a single monitor from command line:

`npm run single [monitorKey]`

`monitorKey` is the key specified in `monitors.js` for the specific monitor you'd like to run.

## Configuration

Configure and see example monitors in `monitors.js`

- key: Unique key for monitor
- description: Human readable description for monitor
- schedule: When / how often to run the monitor, specified in crontab syntax, see http://crontab.guru
- url: URL of website to check
- preStep: any Puppeteer actions to perform before the element to monitor is visible. I.e. cookie popups etc
- element: DOM element to monitor
- validate: Check DOM element, return true to trigger notifications
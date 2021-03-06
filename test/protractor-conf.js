'use strict';

exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    browserName: 'chrome'
  },

  chromeOnly: true,

  baseUrl: 'http://localhost:9999/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};

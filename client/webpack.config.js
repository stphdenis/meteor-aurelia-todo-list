"use strict";

/**
 * To learn more about how to use Easy Webpack
 * Take a look at the README here: https://github.com/easy-webpack/core
 **/
const easyWebpack = require('@easy-webpack/core');
const generateConfig = easyWebpack.default;
const get = easyWebpack.get;
const path = require('path');
const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
let config;

// basic configuration:
const title = 'Todo List with Meteor and Aurelia';
const baseUrl = '/';
const rootDir = path.resolve();
const srcDir = path.resolve('src');
const outDir = path.resolve('dist');

const coreBundles = {
  bootstrap: [
    'aurelia-bootstrapper-webpack',
    'aurelia-polyfills',
    'aurelia-pal',
    'aurelia-pal-browser',
    'regenerator-runtime',
    'bluebird'
  ],
  // these will be included in the 'aurelia' bundle (except for the above bootstrap packages)
  aurelia: [
    'aurelia-bootstrapper-webpack',
    'aurelia-binding',
    'aurelia-dependency-injection',
    'aurelia-event-aggregator',
    'aurelia-framework',
    'aurelia-history',
    'aurelia-history-browser',
    'aurelia-loader',
    'aurelia-loader-webpack',
    'aurelia-logging',
    'aurelia-logging-console',
    'aurelia-metadata',
    'aurelia-pal',
    'aurelia-pal-browser',
    'aurelia-path',
    'aurelia-polyfills',
    'aurelia-route-recognizer',
    'aurelia-router',
    'aurelia-task-queue',
    'aurelia-templating',
    'aurelia-templating-binding',
    'aurelia-templating-router',
    'aurelia-templating-resources'
  ]
}

const baseConfig = {
  entry: {
    'app': [/* this is filled by the aurelia-webpack-plugin */],
    'meteor': [
      'meteor/ddp-common',
      'meteor/ordered-dict',
      'meteor/minimongo',
      'meteor/diff-sequence',
      'meteor/mongo',
      'meteor/accounts-ui-unstyled',
      'meteor/base64',
      'meteor/jquery',
      'meteor/babel-runtime',
      'meteor/srp',
      'meteor/observe-sequence',
      'meteor/service-configuration',
      'meteor/ddp-client',
      'meteor/accounts-base',
      'meteor/promise',
      'meteor/reactive-var',
      'meteor/ecmascript-runtime',
      'meteor/tracker',
      'meteor/modules',
      'meteor/accounts-password',
      'meteor/ejson',
      'meteor/sha',
      'meteor/callback-hook',
      'meteor/mongo-id',
      'meteor/ddp',
      'meteor/spacebars',
      'meteor/localstorage',
      'meteor/accounts-ui',
      'meteor/deps',
      'meteor/reactive-dict',
      'meteor/session',
      'meteor/blaze',
      'meteor/templating',
      'meteor/check',
      'meteor/modules-runtime',
      'meteor/meteor',
      'meteor/id-map',
      'meteor/geojson-utils',
      'meteor/random',
      'meteor/underscore',
      'meteor/retry',
      'meteor/allow-deny',
      'meteor/htmljs'
    ],
    'aurelia-bootstrap': coreBundles.bootstrap,
    'aurelia': coreBundles.aurelia.filter(pkg => coreBundles.bootstrap.indexOf(pkg) === -1)
  },
  output: {
    path: outDir,
  }
}

// advanced configuration:
switch (ENV) {
  case 'production':
    config = generateConfig(
      baseConfig,

      require('@easy-webpack/config-env-production')
        ({compress: true}),
        
      require('@easy-webpack/config-aurelia')
        ({root: rootDir, src: srcDir, title: title, baseUrl: baseUrl}),

      require('@easy-webpack/config-typescript')(),
      require('@easy-webpack/config-html')(),

      require('@easy-webpack/config-css')
        ({ filename: 'styles.css', allChunks: true, sourceMap: false }),

      require('@easy-webpack/config-fonts-and-images')(),
      require('@easy-webpack/config-global-bluebird')(),
      require('@easy-webpack/config-global-jquery')(),
      require('@easy-webpack/config-global-regenerator')(),
      require('@easy-webpack/config-generate-index-html')
        ({minify: true}),

      require('@easy-webpack/config-common-chunks-simple')
        ({appChunkName: 'app', firstChunk: 'aurelia-bootstrap'}),

      require('@easy-webpack/config-copy-files')
        ({patterns: [{ from: 'favicon.ico', to: 'favicon.ico' }]}),

      require('@easy-webpack/config-uglify')
        ({debug: false})
    );
    break;
  
  case 'test':
    config = generateConfig(
      baseConfig,

      require('@easy-webpack/config-env-development')
        ({devtool: 'inline-source-map'}),

      require('@easy-webpack/config-aurelia')
        ({root: rootDir, src: srcDir, title: title, baseUrl: baseUrl}),

      require('@easy-webpack/config-typescript')
        ({ options: { doTypeCheck: false, compilerOptions: { sourceMap: false, inlineSourceMap: true } }}),

      require('@easy-webpack/config-html')(),

      require('@easy-webpack/config-css')
        ({ filename: 'styles.css', allChunks: true, sourceMap: false }),

      require('@easy-webpack/config-fonts-and-images')(),
      require('@easy-webpack/config-global-bluebird')(),
      require('@easy-webpack/config-global-jquery')(),
      require('@easy-webpack/config-global-regenerator')(),
      require('@easy-webpack/config-generate-index-html')(),

      require('@easy-webpack/config-test-coverage-istanbul')()
    );
    break;
  
  default:
  case 'development':
    process.env.NODE_ENV = 'development';
    config = generateConfig(
      baseConfig,

      require('@easy-webpack/config-env-development')(),

      require('@easy-webpack/config-aurelia')
        ({root: rootDir, src: srcDir, title: title, baseUrl: baseUrl}),

      require('@easy-webpack/config-typescript')(),
      require('@easy-webpack/config-html')(),

      require('@easy-webpack/config-css')
        ({ filename: 'styles.css', allChunks: true, sourceMap: false }),

      require('@easy-webpack/config-fonts-and-images')(),
      require('@easy-webpack/config-global-bluebird')(),
      require('@easy-webpack/config-global-jquery')(),
      require('@easy-webpack/config-global-regenerator')(),
      require('@easy-webpack/config-generate-index-html')
        ({minify: false}),

      require('@easy-webpack/config-copy-files')
        ({patterns: [{ from: 'favicon.ico', to: 'favicon.ico' }]}),

      require('@easy-webpack/config-common-chunks-simple')
        ({appChunkName: 'app', firstChunk: 'aurelia-bootstrap'})
    );
    break;
}

// Because we use symlink dirs, we have to add an absolute node_modules dir as fallback
// with absoluteNodeModulesPath: true
config = generateConfig(
  config,
  require('meteor-client-packages/easy-webpack')
    ({absoluteNodeModulesPath: true})
);

console.info('config:', config);//.resolve.alias);

module.exports = config;
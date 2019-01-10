'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

require('../config/env');


const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../webpack.dll.config');
const paths = require('../config/paths');

fs.emptyDirSync(paths.appDllJs)
let compiler = webpack(config);
compiler.run()

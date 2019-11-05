const fs = require('fs')
const path = require('path')

const paths = require('./paths')
const configFactory = require('./webpack.config')

module.exports = function(webpackEnv) {
  const defaultConfig = configFactory(webpackEnv)

  const useRewired = fs.existsSync(paths.rewirePath)
  if (!useRewired) return defaultConfig

  const rewireFactory = require(paths.rewirePath)
  const rewireConfig = rewireFactory(defaultConfig, webpackEnv)
  return rewireConfig
}

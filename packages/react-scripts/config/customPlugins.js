const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin-4x')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// custom environment variables
const PROTest = process.env.npm_config_protest
const analyzer = process.env.npm_config_analyzer
const copyFiles = process.env.REACT_APP_COPY_FILES
const copyOpt = process.env.REACT_APP_COPY_OPTION
const dllInject = process.env.REACT_APP_DLL_INJECT
const dllLibs = process.env.REACT_APP_DLL_LIBS
const lodashShaking = process.env.REACT_APP_LODASH_SHAKING

module.exports = function(isEnvProduction) {
  const copyPlugin =
    copyFiles &&
    new CopyPlugin(
      JSON.parse(copyFiles),
      copyOpt ? JSON.parse(copyOpt) : undefined
    )

  if (!isEnvProduction) return [copyPlugin]

  return [
    new webpack.HashedModuleIdsPlugin(),

    PROTest === 'true' &&
      new webpack.DefinePlugin({
        'process.env': { PROTEST: '"PROTest"' },
      }),

    new AutoDllPlugin({
      inject: dllInject === 'false' ? false : true, // will inject the DLL bundle to index.html
      debug: true,
      filename: '[name]_[hash:8].js',
      path: './dll',
      entry: {
        vendor: dllLibs
          ? JSON.parse(dllLibs)
          : ['react', 'react-dom', 'redux', 'axios', 'qs'],
      },
    }),

    copyPlugin,

    lodashShaking === 'true' && new LodashModuleReplacementPlugin(),

    analyzer === 'true' && new BundleAnalyzerPlugin(),
  ]
}

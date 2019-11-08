const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

const assetsPath = path.resolve(__dirname, './src/common/dll/assets.json')
if (process.env.NODE_ENV === 'production' && !fs.existsSync(assetsPath)) {
  throw new Error('\n \n    assets.json file not exists, you need first build dll vendor. \n    Please see README.md for more details.\n')
}
const dllAssets = require(assetsPath)

module.exports = function(config, webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'

  const mergedConfig = merge(config, {
    plugins: [
      isEnvProduction && new webpack.HashedModuleIdsPlugin(),

      isEnvProduction && new webpack.DllReferencePlugin({
        manifest: require(
          path.resolve(__dirname, './src/common/dll/vendor-manifest.json')
        ),
      }),

      isEnvProduction && new CopyPlugin(
        [{ from: './src/common/dll/' + dllAssets.vendor.js, to: './static/js' }]
      ),

      process.env.npm_config_analyze === 'true' && new BundleAnalyzerPlugin(),

    ].filter(Boolean),
  });

  // module rule list
  const oneOfList = mergedConfig.module.rules.find(rule => rule.oneOf).oneOf

  // babel configuration
  const babelOptions = oneOfList.find(
    rule => rule.include && rule.loader && rule.loader.includes('babel-loader')
  ).options

  // less support
  oneOfList.unshift({
    test: /\.less$/,
    use: [
      ...oneOfList.find(rule => String(rule.test) === String(/\.css$/)).use,
      {
        loader: 'less-loader',
        options: {
          modifyVars: {},
          javascriptEnabled: true,
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        },
      }
    ],
    sideEffects: true,
  })

  // htmlWebpackPlugin instance
  if (isEnvProduction) {
    const htmlPlugin = mergedConfig.plugins.find(
      plugin =>
        plugin.constructor &&
        plugin.constructor.name === 'HtmlWebpackPlugin'
    )
    htmlPlugin.options.dllVendor = 'static/js/' + dllAssets.vendor.js
  }

  return mergedConfig;
};

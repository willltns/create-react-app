const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

// dll vendor related.
let dllAssets
let assetsPath = path.resolve(__dirname, './src/common/dll/assets.json')
if (process.env.NODE_ENV === 'production') {
  if (fs.existsSync(assetsPath)) {
    dllAssets = require(assetsPath)
  } else {
    throw new Error('\n \n    assets.json file not exists, you need first build dll vendor. \n    Please see README.md for more details.\n')
  }
}

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

    ].filter(Boolean),
  });

  // module rule list
  const oneOfList = mergedConfig.module.rules.find(rule => rule.oneOf).oneOf

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

  // babel configuration
  // const babelOptions = oneOfList.find(
  //   rule => rule.include && rule.loader && rule.loader.includes('babel-loader')
  // ).options

  // htmlWebpackPlugin instance, adding filename in order to inject script into html.
  if (isEnvProduction) {
    const htmlWebpackPlugin = mergedConfig.plugins.find(
      plugin =>
        plugin.constructor &&
        plugin.constructor.name === 'HtmlWebpackPlugin'
    )
    htmlWebpackPlugin.options.dllVendor = 'static/js/' + dllAssets.vendor.js
  }

  return mergedConfig;
};

const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

module.exports = function(config, webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const mergedConfig = merge(config, {
    plugins: [
      new webpack.HashedModuleIdsPlugin(),

      new CopyPlugin([
        { 'from': 'src/common/utils/flexible.js', 'to': './utils' }
      ]),

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

  return mergedConfig;
};

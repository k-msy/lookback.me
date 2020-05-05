const path = require('path')
VueLoaderPlugin = require('vue-loader/lib/plugin')
CopyWebpackPlugin = require('copy-webpack-plugin')
// const env = require('./environment/dev.env')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 6052,
    contentBase: './dist'
  },
  output: {
    filename: `lookback.bundle.js`,
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      // 'assets': path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      constants: path.resolve(__dirname, 'constants')
      // 'util': path.resolve(__dirname, 'src/util'),
      // 'entities': path.resolve(__dirname, 'src/entities'),
      // 'enums': path.resolve(__dirname, 'src/enums'),
      // 'models': path.resolve(__dirname, 'src/models'),
      // 'store': path.resolve(__dirname, 'src/store'),
      // 'moment-ja': path.join(__dirname, 'src/util/moment-ja.js')
    }
  },
  module: {
    rules: [
      /** TODO
       * ・jsはjs, assets系はassets系のディレクトリに入れる
       */
      {
        test: /\.(pug|jade)$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          {
            use: ['html-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true,
              data: "@import 'common_colors.sass';",
              includePaths: [path.resolve(__dirname, 'src/styles/')]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.yaml$/,
        use: [
          { loader: 'json-loader' },
          { loader: 'yaml-loader' }
        ]
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=[name].[ext]'
      }


      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    // TODO
    // new CopyWebpackPlugin([{
    //   from: './src/assets',
    //   to: 'assets'
    // }]),
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(env)
    // }),
    new VueLoaderPlugin(),
    // new BundleAnalyzerPlugin()
  ]
}
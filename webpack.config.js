const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');





module.exports = {
  entry: {
    choice: './src/scripts/choices.min.js',
    main: './src/scripts/index.js'
  },
  devtool: "source-map",
  mode: 'production',
  module: {
    rules: [{
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: path.join(__dirname, '/node_modules'),
        use: ['babel-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/main.min.css',
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        sourceMap: false,
      }),
      new ImageMinimizerPlugin({
                 minimizer: {
                   implementation: ImageMinimizerPlugin.imageminMinify,
                   options: {
                     plugins: [
                       ['gifsicle', { interlaced: true }],
                       ['jpegtran', { progressive: true }],
                       ['optipng', { optimizationLevel: 5 }],
                       ['svgo', { name: 'preset-default' }],
                   ],
                   },
                 },
               }),
    ],
  },

}
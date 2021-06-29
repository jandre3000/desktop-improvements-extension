const webpack = require( 'webpack' );
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require( 'path');
const { resolve } = require('path');
const GlobEntriesPlugin = require('webpack-watched-glob-entries-plugin');

module.exports = {
  webpack: (config) => {
    // config.resolve.extensions = [".vue", ".css", ".js"];

    const entries = []

    entries.push(resolve('app', '*.{js,mjs,jsx}'))
    entries.push(resolve('app', '?(content)/**/*.{js,mjs}'))
    entries.push(resolve('app', '?(prototypes)/**/*.{js,mjs,jsx}'))
    entries.push(resolve('app', '?(pages)/**/*.{js,mjs,jsx}'))
    entries.push(resolve('app', '?(background)/**/*.{js,mjs,jsx}'))

    config.entry = GlobEntriesPlugin.getEntries(
      entries
    )

    config.resolve.alias = { '@app' : path.resolve(__dirname, './app') };

    config.module.rules.push(
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.less$/i,
        loader: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 81920,
            },
          },
        ],
      },
      {
        test: /\.svg(\?.*)?$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: false,
            },
          },
        ],
      },
    );

    config.plugins = [
      ...config.plugins,
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: true
      }),
    ];

    return config;
  },
};

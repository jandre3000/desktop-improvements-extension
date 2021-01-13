const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require( 'path');
const { resolve } = require('path');
const glob = require("glob");
const GlobEntriesPlugin = require('webpack-watched-glob-entries-plugin');

module.exports = {
  webpack: (config) => {
    // config.resolve.extensions = [".vue", ".css", ".js"];

    const entries = []

    entries.push(resolve('app', '*.{js,mjs,jsx}'))
    entries.push(resolve('app', '?(scripts)/**/*.{js,mjs,jsx}'))
    entries.push(resolve('app', '?(prototypes)/**/*.{js,mjs,jsx}'))
    entries.push(resolve('app', '?(pages)/**/*.{js,mjs,jsx}'))

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
        test: /\.(woff(2)?|ttf|eot|png)(\?v=\d+\.\d+\.\d+)?$/,
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
    ];

    return config;
  },
};

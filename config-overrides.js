const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    assets: false,
    fs: false,
    tls: false,
    net: false,
    buffer: false,
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
    os: require.resolve("os-browserify/browser"),
    zlib: require.resolve("browserify-zlib"),
  };

  config.resolve.extensions = [...config.resolve.extensions, ".js", ".ts"];
  config.plugins = [
    ...config.plugins,
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ];
  config.module.rules = [
    {
      test: /\.m?ts$|\.tsx?$/,
      // exclude: /node_modules/,
      use: {
        loader: "ts-loader",
        options: {
          onlyCompileBundledFiles: true,
        },
      },
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    },
    {
      test: /\.(woff|woff2|ttf|eot|png|jpg|svg|gif)$/i,
      use: ["file-loader"],
    },
  ];

  return config;
};

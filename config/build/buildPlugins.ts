import HtmlWebpackPlugin from "html-webpack-plugin";
import {Configuration, ProgressPlugin, DefinePlugin} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export const buildPlugins = (options: BuildOptions): Configuration['plugins'] => {
  const {mode, paths, analyzerReport, platform} = options;
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      title: 'HTML Webpack Plugin',
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.png'),
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode),
    }),
  ];

  if (isDevelopment) {
    plugins.push(
     new ProgressPlugin(),
     new ForkTsCheckerWebpackPlugin(),
     new ReactRefreshWebpackPlugin(),
    );
  }

  if (isProduction) {
    plugins.push(
     new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
     }),
     new CopyPlugin({
       patterns: [
         {
           from: path.resolve(paths.public, 'locales'),
           to: path.resolve(paths.output, 'locales'),
         },
       ],
     }),
    );

    if(analyzerReport) {
      plugins.push(new BundleAnalyzerPlugin());
    }
  }

  return plugins;
}

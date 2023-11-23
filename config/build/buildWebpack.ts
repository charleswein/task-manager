import {Configuration} from "webpack";
import {buildLoaders} from "./buildLoaders";
import {buildDevServer} from "./buildDevServer";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types";

export const buildWebpack = (options: BuildOptions) : Configuration => {
  const {mode, paths} = options;
  const isDevelopment = mode === 'development';

  return {
    mode: options.mode,
    entry: {
      app: paths.entry,
    },
    output: {
      path: paths.output,
      filename: '[name].[contenthash].bundle.js',
      clean: true, // clean the output directory before emit.
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolvers(options),
    devtool: isDevelopment ? 'inline-source-map' : false,
    devServer: isDevelopment ? buildDevServer(options) : undefined,
  };
}

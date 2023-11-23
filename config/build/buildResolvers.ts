import {Configuration} from "webpack";
import {BuildOptions} from "./types";

export const buildResolvers = (options: BuildOptions): Configuration['resolve'] => {
  const {paths} = options;
  return {
    extensions: ['.tsx', '.ts', '.js'], // resolve these extensions in order for modules,
    alias: {
      '@': paths.source,
    }
  };
}

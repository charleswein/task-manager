import {Configuration as WebpackDevServerConfiguration} from "webpack-dev-server";
import {BuildOptions} from "./types";

export const buildDevServer = ({port = 3000}: BuildOptions): WebpackDevServerConfiguration => ({
  port,
  open: true,
  allowedHosts: 'all',
  historyApiFallback: true,
  hot: true,
});
